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
  mapSerializer,
  struct,
  u8,
} from '@metaplex-foundation/umi/serializers';
import {
  ResolvedAccount,
  ResolvedAccountsWithIndices,
  getAccountMetasAndSigners,
} from '../shared';

// Accounts.
export type FreezeInstructionAccounts = {
  /** The address of the asset */
  assetAddress: PublicKey | Pda;
  /** The delegate of the asset */
  delegate: Signer;
  /** The SPL Noop Program */
  logWrapper?: PublicKey | Pda;
};

// Data.
export type FreezeInstructionData = { discriminator: number };

export type FreezeInstructionDataArgs = {};

export function getFreezeInstructionDataSerializer(): Serializer<
  FreezeInstructionDataArgs,
  FreezeInstructionData
> {
  return mapSerializer<FreezeInstructionDataArgs, any, FreezeInstructionData>(
    struct<FreezeInstructionData>([['discriminator', u8()]], {
      description: 'FreezeInstructionData',
    }),
    (value) => ({ ...value, discriminator: 6 })
  ) as Serializer<FreezeInstructionDataArgs, FreezeInstructionData>;
}

// Instruction.
export function freeze(
  context: Pick<Context, 'programs'>,
  input: FreezeInstructionAccounts
): TransactionBuilder {
  // Program ID.
  const programId = context.programs.getPublicKey(
    'mplAsset',
    'ASSETp3DinZKfiAyvdQG16YWWLJ2X3ZKjg9zku7n1sZD'
  );

  // Accounts.
  const resolvedAccounts: ResolvedAccountsWithIndices = {
    assetAddress: {
      index: 0,
      isWritable: true,
      value: input.assetAddress ?? null,
    },
    delegate: { index: 1, isWritable: false, value: input.delegate ?? null },
    logWrapper: {
      index: 2,
      isWritable: false,
      value: input.logWrapper ?? null,
    },
  };

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
  const data = getFreezeInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
