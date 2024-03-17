/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import {
  GetDataEnumKind,
  GetDataEnumKindContent,
  Serializer,
  dataEnum,
  struct,
  tuple,
} from '@metaplex-foundation/umi/serializers';
import {
  Attributes,
  AttributesArgs,
  Burn,
  BurnArgs,
  Freeze,
  FreezeArgs,
  PermanentBurn,
  PermanentBurnArgs,
  PermanentFreeze,
  PermanentFreezeArgs,
  PermanentTransfer,
  PermanentTransferArgs,
  Royalties,
  RoyaltiesArgs,
  Transfer,
  TransferArgs,
  UpdateDelegate,
  UpdateDelegateArgs,
  getAttributesSerializer,
  getBurnSerializer,
  getFreezeSerializer,
  getPermanentBurnSerializer,
  getPermanentFreezeSerializer,
  getPermanentTransferSerializer,
  getRoyaltiesSerializer,
  getTransferSerializer,
  getUpdateDelegateSerializer,
} from '.';

export type Plugin =
  | { __kind: 'Royalties'; fields: [Royalties] }
  | { __kind: 'Freeze'; fields: [Freeze] }
  | { __kind: 'Burn'; fields: [Burn] }
  | { __kind: 'Transfer'; fields: [Transfer] }
  | { __kind: 'UpdateDelegate'; fields: [UpdateDelegate] }
  | { __kind: 'PermanentFreeze'; fields: [PermanentFreeze] }
  | { __kind: 'Attributes'; fields: [Attributes] }
  | { __kind: 'PermanentTransfer'; fields: [PermanentTransfer] }
  | { __kind: 'PermanentBurn'; fields: [PermanentBurn] };

export type PluginArgs =
  | { __kind: 'Royalties'; fields: [RoyaltiesArgs] }
  | { __kind: 'Freeze'; fields: [FreezeArgs] }
  | { __kind: 'Burn'; fields: [BurnArgs] }
  | { __kind: 'Transfer'; fields: [TransferArgs] }
  | { __kind: 'UpdateDelegate'; fields: [UpdateDelegateArgs] }
  | { __kind: 'PermanentFreeze'; fields: [PermanentFreezeArgs] }
  | { __kind: 'Attributes'; fields: [AttributesArgs] }
  | { __kind: 'PermanentTransfer'; fields: [PermanentTransferArgs] }
  | { __kind: 'PermanentBurn'; fields: [PermanentBurnArgs] };

export function getPluginSerializer(): Serializer<PluginArgs, Plugin> {
  return dataEnum<Plugin>(
    [
      [
        'Royalties',
        struct<GetDataEnumKindContent<Plugin, 'Royalties'>>([
          ['fields', tuple([getRoyaltiesSerializer()])],
        ]),
      ],
      [
        'Freeze',
        struct<GetDataEnumKindContent<Plugin, 'Freeze'>>([
          ['fields', tuple([getFreezeSerializer()])],
        ]),
      ],
      [
        'Burn',
        struct<GetDataEnumKindContent<Plugin, 'Burn'>>([
          ['fields', tuple([getBurnSerializer()])],
        ]),
      ],
      [
        'Transfer',
        struct<GetDataEnumKindContent<Plugin, 'Transfer'>>([
          ['fields', tuple([getTransferSerializer()])],
        ]),
      ],
      [
        'UpdateDelegate',
        struct<GetDataEnumKindContent<Plugin, 'UpdateDelegate'>>([
          ['fields', tuple([getUpdateDelegateSerializer()])],
        ]),
      ],
      [
        'PermanentFreeze',
        struct<GetDataEnumKindContent<Plugin, 'PermanentFreeze'>>([
          ['fields', tuple([getPermanentFreezeSerializer()])],
        ]),
      ],
      [
        'Attributes',
        struct<GetDataEnumKindContent<Plugin, 'Attributes'>>([
          ['fields', tuple([getAttributesSerializer()])],
        ]),
      ],
      [
        'PermanentTransfer',
        struct<GetDataEnumKindContent<Plugin, 'PermanentTransfer'>>([
          ['fields', tuple([getPermanentTransferSerializer()])],
        ]),
      ],
      [
        'PermanentBurn',
        struct<GetDataEnumKindContent<Plugin, 'PermanentBurn'>>([
          ['fields', tuple([getPermanentBurnSerializer()])],
        ]),
      ],
    ],
    { description: 'Plugin' }
  ) as Serializer<PluginArgs, Plugin>;
}

// Data Enum Helpers.
export function plugin(
  kind: 'Royalties',
  data: GetDataEnumKindContent<PluginArgs, 'Royalties'>['fields']
): GetDataEnumKind<PluginArgs, 'Royalties'>;
export function plugin(
  kind: 'Freeze',
  data: GetDataEnumKindContent<PluginArgs, 'Freeze'>['fields']
): GetDataEnumKind<PluginArgs, 'Freeze'>;
export function plugin(
  kind: 'Burn',
  data: GetDataEnumKindContent<PluginArgs, 'Burn'>['fields']
): GetDataEnumKind<PluginArgs, 'Burn'>;
export function plugin(
  kind: 'Transfer',
  data: GetDataEnumKindContent<PluginArgs, 'Transfer'>['fields']
): GetDataEnumKind<PluginArgs, 'Transfer'>;
export function plugin(
  kind: 'UpdateDelegate',
  data: GetDataEnumKindContent<PluginArgs, 'UpdateDelegate'>['fields']
): GetDataEnumKind<PluginArgs, 'UpdateDelegate'>;
export function plugin(
  kind: 'PermanentFreeze',
  data: GetDataEnumKindContent<PluginArgs, 'PermanentFreeze'>['fields']
): GetDataEnumKind<PluginArgs, 'PermanentFreeze'>;
export function plugin(
  kind: 'Attributes',
  data: GetDataEnumKindContent<PluginArgs, 'Attributes'>['fields']
): GetDataEnumKind<PluginArgs, 'Attributes'>;
export function plugin(
  kind: 'PermanentTransfer',
  data: GetDataEnumKindContent<PluginArgs, 'PermanentTransfer'>['fields']
): GetDataEnumKind<PluginArgs, 'PermanentTransfer'>;
export function plugin(
  kind: 'PermanentBurn',
  data: GetDataEnumKindContent<PluginArgs, 'PermanentBurn'>['fields']
): GetDataEnumKind<PluginArgs, 'PermanentBurn'>;
export function plugin<K extends PluginArgs['__kind']>(
  kind: K,
  data?: any
): Extract<PluginArgs, { __kind: K }> {
  return Array.isArray(data)
    ? { __kind: kind, fields: data }
    : { __kind: kind, ...(data ?? {}) };
}
export function isPlugin<K extends Plugin['__kind']>(
  kind: K,
  value: Plugin
): value is Plugin & { __kind: K } {
  return value.__kind === kind;
}
