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
export type DecompressInstructionAccounts = {
  /** The address of the asset */
  assetAddress: PublicKey | Pda;
  /** The owner or delegate of the asset */
  owner: Signer;
  /** The account paying for the storage fees */
  payer?: Signer;
  /** The system program */
  systemProgram?: PublicKey | Pda;
  /** The SPL Noop Program */
  logWrapper?: PublicKey | Pda;
};

// Data.
export type DecompressInstructionData = { discriminator: number };

export type DecompressInstructionDataArgs = {};

export function getDecompressInstructionDataSerializer(): Serializer<
  DecompressInstructionDataArgs,
  DecompressInstructionData
> {
  return mapSerializer<
    DecompressInstructionDataArgs,
    any,
    DecompressInstructionData
  >(
    struct<DecompressInstructionData>([['discriminator', u8()]], {
      description: 'DecompressInstructionData',
    }),
    (value) => ({ ...value, discriminator: 9 })
  ) as Serializer<DecompressInstructionDataArgs, DecompressInstructionData>;
}

// Instruction.
export function decompress(
  context: Pick<Context, 'programs'>,
  input: DecompressInstructionAccounts
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
    owner: { index: 1, isWritable: false, value: input.owner ?? null },
    payer: { index: 2, isWritable: true, value: input.payer ?? null },
    systemProgram: {
      index: 3,
      isWritable: false,
      value: input.systemProgram ?? null,
    },
    logWrapper: {
      index: 4,
      isWritable: false,
      value: input.logWrapper ?? null,
    },
  };

  // Default values.
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
  const data = getDecompressInstructionDataSerializer().serialize({});

  // Bytes Created On Chain.
  const bytesCreatedOnChain = 0;

  return transactionBuilder([
    { instruction: { keys, programId, data }, signers, bytesCreatedOnChain },
  ]);
}
