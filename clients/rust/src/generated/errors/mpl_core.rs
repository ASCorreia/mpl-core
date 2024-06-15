//! This code was AUTOGENERATED using the kinobi library.
//! Please DO NOT EDIT THIS FILE, instead use visitors
//! to add features, then rerun kinobi to update it.
//!
//! [https://github.com/metaplex-foundation/kinobi]
//!

use num_derive::FromPrimitive;
use thiserror::Error;

#[derive(Clone, Debug, Eq, Error, FromPrimitive, PartialEq)]
pub enum MplCoreError {
    /// 0 (0x0) - Invalid System Program
    #[error("Invalid System Program")]
    InvalidSystemProgram,
    /// 1 (0x1) - Error deserializing account
    #[error("Error deserializing account")]
    DeserializationError,
    /// 2 (0x2) - Error serializing account
    #[error("Error serializing account")]
    SerializationError,
    /// 3 (0x3) - Plugins not initialized
    #[error("Plugins not initialized")]
    PluginsNotInitialized,
    /// 4 (0x4) - Plugin not found
    #[error("Plugin not found")]
    PluginNotFound,
    /// 5 (0x5) - Numerical Overflow
    #[error("Numerical Overflow")]
    NumericalOverflow,
    /// 6 (0x6) - Incorrect account
    #[error("Incorrect account")]
    IncorrectAccount,
    /// 7 (0x7) - Incorrect asset hash
    #[error("Incorrect asset hash")]
    IncorrectAssetHash,
    /// 8 (0x8) - Invalid Plugin
    #[error("Invalid Plugin")]
    InvalidPlugin,
    /// 9 (0x9) - Invalid Authority
    #[error("Invalid Authority")]
    InvalidAuthority,
    /// 10 (0xA) - Cannot transfer a frozen asset
    #[error("Cannot transfer a frozen asset")]
    AssetIsFrozen,
    /// 11 (0xB) - Missing compression proof
    #[error("Missing compression proof")]
    MissingCompressionProof,
    /// 12 (0xC) - Cannot migrate a master edition used for prints
    #[error("Cannot migrate a master edition used for prints")]
    CannotMigrateMasterWithSupply,
    /// 13 (0xD) - Cannot migrate a print edition
    #[error("Cannot migrate a print edition")]
    CannotMigratePrints,
    /// 14 (0xE) - Cannot burn a collection NFT
    #[error("Cannot burn a collection NFT")]
    CannotBurnCollection,
    /// 15 (0xF) - Plugin already exists
    #[error("Plugin already exists")]
    PluginAlreadyExists,
    /// 16 (0x10) - Numerical overflow
    #[error("Numerical overflow")]
    NumericalOverflowError,
    /// 17 (0x11) - Already compressed account
    #[error("Already compressed account")]
    AlreadyCompressed,
    /// 18 (0x12) - Already decompressed account
    #[error("Already decompressed account")]
    AlreadyDecompressed,
    /// 19 (0x13) - Invalid Collection passed in
    #[error("Invalid Collection passed in")]
    InvalidCollection,
    /// 20 (0x14) - Missing update authority
    #[error("Missing update authority")]
    MissingUpdateAuthority,
    /// 21 (0x15) - Missing new owner
    #[error("Missing new owner")]
    MissingNewOwner,
    /// 22 (0x16) - Missing system program
    #[error("Missing system program")]
    MissingSystemProgram,
    /// 23 (0x17) - Feature not available
    #[error("Feature not available")]
    NotAvailable,
    /// 24 (0x18) - Invalid Asset passed in
    #[error("Invalid Asset passed in")]
    InvalidAsset,
    /// 25 (0x19) - Missing collection
    #[error("Missing collection")]
    MissingCollection,
    /// 26 (0x1A) - Neither the asset or any plugins have approved this operation
    #[error("Neither the asset or any plugins have approved this operation")]
    NoApprovals,
    /// 27 (0x1B) - Plugin Manager cannot redelegate a delegated plugin without revoking first
    #[error("Plugin Manager cannot redelegate a delegated plugin without revoking first")]
    CannotRedelegate,
    /// 28 (0x1C) - Invalid setting for plugin
    #[error("Invalid setting for plugin")]
    InvalidPluginSetting,
    /// 29 (0x1D) - Cannot specify both an update authority and collection on an asset
    #[error("Cannot specify both an update authority and collection on an asset")]
    ConflictingAuthority,
    /// 30 (0x1E) - Invalid Log Wrapper Program
    #[error("Invalid Log Wrapper Program")]
    InvalidLogWrapperProgram,
    /// 31 (0x1F) - External Plugin Adapter not found
    #[error("External Plugin Adapter not found")]
    ExternalPluginAdapterNotFound,
    /// 32 (0x20) - External Plugin Adapter already exists
    #[error("External Plugin Adapter already exists")]
    ExternalPluginAdapterAlreadyExists,
    /// 33 (0x21) - Missing asset needed for extra account PDA derivation
    #[error("Missing asset needed for extra account PDA derivation")]
    MissingAsset,
    /// 34 (0x22) - Missing account needed for external plugin adapter
    #[error("Missing account needed for external plugin adapter")]
    MissingExternalPluginAdapterAccount,
    /// 35 (0x23) - Oracle external plugin adapter can only be configured to reject
    #[error("Oracle external plugin adapter can only be configured to reject")]
    OracleCanRejectOnly,
    /// 36 (0x24) - External plugin adapter must have at least one lifecycle check
    #[error("External plugin adapter must have at least one lifecycle check")]
    RequiresLifecycleCheck,
    /// 37 (0x25) - Duplicate lifecycle checks were provided for external plugin adapter
    #[error("Duplicate lifecycle checks were provided for external plugin adapter ")]
    DuplicateLifecycleChecks,
    /// 38 (0x26) - Could not read from oracle account
    #[error("Could not read from oracle account")]
    InvalidOracleAccountData,
    /// 39 (0x27) - Oracle account is uninitialized
    #[error("Oracle account is uninitialized")]
    UninitializedOracleAccount,
    /// 40 (0x28) - Missing required signer for operation
    #[error("Missing required signer for operation")]
    MissingSigner,
    /// 41 (0x29) - Invalid plugin operation
    #[error("Invalid plugin operation")]
    InvalidPluginOperation,
    /// 42 (0x2A) - Two data sources provided, only one is allowed
    #[error("Two data sources provided, only one is allowed")]
    TwoDataSources,
    /// 43 (0x2B) - External Plugin does not support this operation
    #[error("External Plugin does not support this operation")]
    UnsupportedOperation,
    /// 44 (0x2C) - No data sources provided, one is required
    #[error("No data sources provided, one is required")]
    NoDataSources,
    /// 45 (0x2D) - This plugin adapter cannot be added to an Asset
    #[error("This plugin adapter cannot be added to an Asset")]
    InvalidPluginAdapterTarget,
    /// 46 (0x2E) - Cannot add a Data Section without a linked external plugin
    #[error("Cannot add a Data Section without a linked external plugin")]
    CannotAddDataSection,
}

impl solana_program::program_error::PrintProgramError for MplCoreError {
    fn print<E>(&self) {
        solana_program::msg!(&self.to_string());
    }
}
