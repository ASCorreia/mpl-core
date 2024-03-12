/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  Context,
  Pda,
  PublicKey,
  Signer,
  TransactionBuilder,
  transactionBuilder,
} from '@metaplex-foundation/umi';
import {
  Serializer,
  array,
  mapSerializer,
  string,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';
import {
  PluginAuthorityPair,
  PluginAuthorityPairArgs,
  getPluginAuthorityPairSerializer,
} from '../types';

// Accounts.
export type CreateCollectionInstructionAccounts = {
  /** The address of the new asset */
  collection: Signer;
  /** The authority of the new asset */
  updateAuthority?: PublicKey | Pda;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** The system program */
  systemProgram?: PublicKey | Pda;
};

// Data.
export type CreateCollectionInstructionData = {
  discriminator: number;
  name: string;
  uri: string;
  plugins: Array<PluginAuthorityPair>;
};

export type CreateCollectionInstructionDataArgs = {
  name: string;
  uri: string;
  plugins?: Array<PluginAuthorityPairArgs>;
};

export function getCreateCollectionInstructionDataSerializer(): Serializer<
  CreateCollectionInstructionDataArgs,
  CreateCollectionInstructionData
> {
  return mapSerializer<
    CreateCollectionInstructionDataArgs,
    any,
    CreateCollectionInstructionData
  >(
    struct<CreateCollectionInstructionData>(
      [
        ['discriminator', u8()],
        ['name', string()],
        ['uri', string()],
        ['plugins', array(getPluginAuthorityPairSerializer())],
      ],
      { description: 'CreateCollectionInstructionData' }
    ),
    (value) => ({ ...value, discriminator: 1, plugins: value.plugins ?? [] })
  ) as Serializer<
    CreateCollectionInstructionDataArgs,
    CreateCollectionInstructionData
  >;
}

// Args.
export type CreateCollectionInstructionArgs =
  CreateCollectionInstructionDataArgs;

// Instruction.
export function createCollection(
  context: Pick<Context, 'payer' | 'programs'>,
  input: CreateCollectionInstructionAccounts & CreateCollectionInstructionArgs
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplCore',
    'CoREENxT6tW1HoK8ypY1SxRMZTcVPm7R94rH4PZNhX7d'
  );

  // Accounts.
  const resolvedAccounts = {
    collection: {
      index: 0,
      isWritable: true as boolean,
      value: input.collection ?? null,
    },
    updateAuthority: {
      index: 1,
      isWritable: false as boolean,
      value: input.updateAuthority ?? null,
    },
    payer: {
      index: 2,
      isWritable: true as boolean,
      value: input.payer ?? null,
    },
    systemProgram: {
      index: 3,
      isWritable: false as boolean,
      value: input.systemProgram ?? null,
    },
  } satisfies ResolvedAccountsWithIndices;

  // Arguments.
  const resolvedArgs: CreateCollectionInstructionArgs = { ...input };

  // Default values.
  if (!resolvedAccounts.payer.value) {
    resolvedAccounts.payer.value = context.payer;
  }
  if (!resolvedAccounts.systemProgram.value) {
    resolvedAccounts.systemProgram.value = context.programs.getPublicKey(
      'splSystem',
      '11111111111111111111111111111111'
    );
    resolvedAccounts.systemProgram.isWritable = false;
  }

  // Accounts in order.
  const orderedAccounts: ResolvedAccount[] = Object.values(
    resolvedAccounts
  ).sort((a, b) => a.index - b.index);

  // Keys and Signers.
  const [keys, signers] = getAccountMetasAndSigners(
    orderedAccounts,
    'programId',
    programId
  );

  // Data.
  const data = getCreateCollectionInstructionDataSerializer().serialize(
    resolvedArgs as CreateCollectionInstructionDataArgs
  );

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
