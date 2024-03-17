import { generateSigner } from '@metaplex-foundation/umi';
import test from 'ava';
import {
  PluginType,
  approvePluginAuthority,
  updatePlugin,
  pluginAuthorityPair,
  pubkeyPluginAuthority,
  createPlugin,
} from '../../../src';
import {
  DEFAULT_ASSET,
  assertAsset,
  createAsset,
  createUmi,
} from '../../_setup';

test('it can delegate a new authority', async (t) => {
  // Given a Umi instance and a new signer.
  const umi = await createUmi();
  const delegateAddress = generateSigner(umi);

  const asset = await createAsset(umi, {
    plugins: [pluginAuthorityPair({ type: 'FreezeDelegate', data: { frozen: false } })],
  });

  await approvePluginAuthority(umi, {
    asset: asset.publicKey,
    pluginType: PluginType.FreezeDelegate,
    newAuthority: pubkeyPluginAuthority(delegateAddress.publicKey),
  }).sendAndConfirm(umi);

  await assertAsset(t, umi, {
    ...DEFAULT_ASSET,
    asset: asset.publicKey,
    owner: umi.identity.publicKey,
    updateAuthority: { type: 'Address', address: umi.identity.publicKey },
    freezeDelegate: {
      authority: {
        type: 'Pubkey',
        address: delegateAddress.publicKey,
      },
      frozen: false,
    },
  });
});

test('a delegate can freeze the token', async (t) => {
  // Given a Umi instance and a new signer.
  const umi = await createUmi();
  const delegateAddress = generateSigner(umi);

  const asset = await createAsset(umi, {
    plugins: [pluginAuthorityPair({ type: 'FreezeDelegate', data: { frozen: false } })],
  });

  await approvePluginAuthority(umi, {
    asset: asset.publicKey,
    pluginType: PluginType.FreezeDelegate,
    newAuthority: pubkeyPluginAuthority(delegateAddress.publicKey),
  }).sendAndConfirm(umi);

  const umi2 = await createUmi();
  await updatePlugin(umi2, {
    asset: asset.publicKey,
    authority: delegateAddress,
    plugin: createPlugin({ type: 'FreezeDelegate', data: { frozen: true } }),
  }).sendAndConfirm(umi2);

  await assertAsset(t, umi, {
    ...DEFAULT_ASSET,
    asset: asset.publicKey,
    owner: umi.identity.publicKey,
    updateAuthority: { type: 'Address', address: umi.identity.publicKey },
    freezeDelegate: {
      authority: {
        type: 'Pubkey',
        address: delegateAddress.publicKey,
      },
      frozen: true,
    },
  });
});
