import test from 'ava';

import { generateSigner } from '@metaplex-foundation/umi';
import {
  pluginAuthorityPair,
  updatePluginAuthority,
  createPlugin,
  addPluginV1,
  addCollectionPluginV1,
  createCollectionV2,
  pluginAuthorityPairV2,
  updateCollectionPlugin,
} from '../../../src';
import {
  DEFAULT_COLLECTION,
  assertCollection,
  createAsset,
  createCollection,
  createUmi,
} from '../../_setupRaw';

test('it can add treasury to collection', async (t) => {
  const umi = await createUmi();
  const collection = await createCollection(umi);

  await addCollectionPluginV1(umi, {
    collection: collection.publicKey,
    plugin: createPlugin({
      type: 'Treasury',
      data: {
        withdrawn: 0,
      },
    }),
  }).sendAndConfirm(umi);

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });
});

test('it can create collection with treasury', async (t) => {
  const umi = await createUmi();

  const collection = await createCollection(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });
});

test('it cannot create treasury with nonzero withdrawn', async (t) => {
  const umi = await createUmi();

  const result = createCollectionV2(umi, {
    collection: generateSigner(umi),
    name: 'TEST',
    uri: 'www.test.com',
    plugins: [
      pluginAuthorityPairV2({
        type: 'Treasury',
        withdrawn: 10,
      }),
    ],
  }).sendAndConfirm(umi);

  await t.throwsAsync(result, {
    name: 'InvalidTreasuryWithdrawn',
  });
});

test('it cannot add treasury with nonzero withdrawn', async (t) => {
  const umi = await createUmi();
  const collection = await createCollection(umi);

  const result = addCollectionPluginV1(umi, {
    collection: collection.publicKey,
    plugin: createPlugin({
      type: 'Treasury',
      data: {
        withdrawn: 10,
      },
    }),
  }).sendAndConfirm(umi);

  await t.throwsAsync(result, {
    name: 'InvalidTreasuryWithdrawn',
  });
});

test('it cannot add treasury to asset', async (t) => {
  const umi = await createUmi();

  const asset = await createAsset(umi);

  const result = addPluginV1(umi, {
    asset: asset.publicKey,
    plugin: createPlugin({
      type: 'Treasury',
      data: {
        withdrawn: 0,
      },
    }),
  }).sendAndConfirm(umi);

  await t.throwsAsync(result, {
    name: 'PluginNotAllowedOnAsset',
  });
});

test('it cannot create asset with treasury', async (t) => {
  const umi = await createUmi();

  const result = createAsset(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  await t.throwsAsync(result, {
    name: 'PluginNotAllowedOnAsset',
  });
});

test('it can deposit SOL to treasury', async (t) => {
  const umi = await createUmi();

  const collection = await createCollection(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });

  const identityBeforeBalance = await umi.rpc.getBalance(
    umi.identity.publicKey
  );
  const collectionBeforeBalance = await umi.rpc.getBalance(
    collection.publicKey
  );

  await updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: -1_000_000,
    },
  }).sendAndConfirm(umi);

  const identityAfterBalance = await umi.rpc.getBalance(umi.identity.publicKey);
  const collectionAfterBalance = await umi.rpc.getBalance(collection.publicKey);

  const identityExpected =
    identityBeforeBalance.basisPoints -
    1_000_000n - // Deposited
    5_000n; // Transaction fee
  t.is(identityExpected, identityAfterBalance.basisPoints);
  t.is(
    collectionBeforeBalance.basisPoints + 1_000_000n,
    collectionAfterBalance.basisPoints
  );

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: -1_000_000,
    },
  });
});

test('it can withdraw SOL from treasury', async (t) => {
  const umi = await createUmi();

  const collection = await createCollection(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });

  await updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: -1_000_000,
    },
  }).sendAndConfirm(umi);

  const identityBeforeBalance = await umi.rpc.getBalance(
    umi.identity.publicKey
  );
  const collectionBeforeBalance = await umi.rpc.getBalance(
    collection.publicKey
  );

  await updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: 0,
    },
  }).sendAndConfirm(umi);

  const identityAfterBalance = await umi.rpc.getBalance(umi.identity.publicKey);
  const collectionAfterBalance = await umi.rpc.getBalance(collection.publicKey);

  const identityExpected =
    identityBeforeBalance.basisPoints +
    1_000_000n - // Withdrawn
    5_000n; // Transaction fee
  t.is(identityExpected, identityAfterBalance.basisPoints);
  t.is(
    collectionBeforeBalance.basisPoints - 1_000_000n,
    collectionAfterBalance.basisPoints
  );

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });
});

test('it cannot withdraw more than excess rent from treasury', async (t) => {
  const umi = await createUmi();

  const collection = await createCollection(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });

  await updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: -1_000_000,
    },
  }).sendAndConfirm(umi);

  const result = updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: 1,
    },
  }).sendAndConfirm(umi);

  await t.throwsAsync(result, {
    name: 'CannotOverdraw',
  });
});

test('it cannot withdraw entire balance from treasury', async (t) => {
  const umi = await createUmi();

  const collection = await createCollection(umi, {
    plugins: [
      pluginAuthorityPair({
        type: 'Treasury',
        data: {
          withdrawn: 0,
        },
        authority: updatePluginAuthority(),
      }),
    ],
  });

  const result = updateCollectionPlugin(umi, {
    collection: collection.publicKey,
    plugin: {
      type: 'Treasury',
      withdrawn: Number(collection.header.lamports.basisPoints),
    },
  }).sendAndConfirm(umi);

  await t.throwsAsync(result, {
    name: 'CannotOverdraw',
  });

  await assertCollection(t, umi, {
    ...DEFAULT_COLLECTION,
    collection: collection.publicKey,
    updateAuthority: umi.identity.publicKey,
    treasury: {
      authority: {
        type: 'UpdateAuthority',
      },
      withdrawn: 0,
    },
  });
});
