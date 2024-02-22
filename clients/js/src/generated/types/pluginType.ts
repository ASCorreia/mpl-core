/**
 * This code was AUTOGENERATED using the kinobi library.
 * Please DO NOT EDIT THIS FILE, instead use visitors
 * to add features, then rerun kinobi to update it.
 *
 * @see https://github.com/metaplex-foundation/kinobi
 */

import { Serializer, scalarEnum } from '@metaplex-foundation/umi/serializers';

export enum PluginType {
  Reserved,
  Royalties,
  Freeze,
  Burn,
  Transfer,
  Collection,
}

export type PluginTypeArgs = PluginType;

export function getPluginTypeSerializer(): Serializer<
  PluginTypeArgs,
  PluginType
> {
  return scalarEnum<PluginType>(PluginType, {
    description: 'PluginType',
  }) as Serializer<PluginTypeArgs, PluginType>;
}
