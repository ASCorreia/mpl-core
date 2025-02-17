use borsh::{BorshDeserialize, BorshSerialize};
use solana_program::program_error::ProgramError;

use crate::{
    plugins::{
        abstain, approve, reject, Plugin, PluginValidation, PluginValidationContext,
        ValidationResult,
    },
    state::DataBlob,
};

/// The freeze delegate plugin allows any authority to lock the asset so it's no longer transferable.
/// The default authority for this plugin is the owner.
#[repr(C)]
#[derive(Clone, Copy, BorshSerialize, BorshDeserialize, Debug, PartialEq, Eq)]
pub struct FreezeDelegate {
    /// The current state of the asset and whether or not it's transferable.
    pub frozen: bool, // 1
}

impl FreezeDelegate {
    const BASE_LEN: usize = 1; // The frozen boolean

    /// Initialize the Freeze plugin, unfrozen by default.
    pub fn new() -> Self {
        Self { frozen: false }
    }
}

impl Default for FreezeDelegate {
    fn default() -> Self {
        Self::new()
    }
}

impl DataBlob for FreezeDelegate {
    fn len(&self) -> usize {
        Self::BASE_LEN
    }
}

impl PluginValidation for FreezeDelegate {
    fn validate_burn(
        &self,
        _ctx: &PluginValidationContext,
    ) -> Result<ValidationResult, ProgramError> {
        if self.frozen {
            reject!()
        } else {
            abstain!()
        }
    }

    fn validate_transfer(
        &self,
        _ctx: &PluginValidationContext,
    ) -> Result<ValidationResult, ProgramError> {
        if self.frozen {
            reject!()
        } else {
            abstain!()
        }
    }

    fn validate_approve_plugin_authority(
        &self,
        ctx: &PluginValidationContext,
    ) -> Result<ValidationResult, ProgramError> {
        if let Some(Plugin::FreezeDelegate(freeze)) = ctx.target_plugin {
            if freeze.frozen {
                return reject!();
            }
        }
        abstain!()
    }

    /// Validate the revoke plugin authority lifecycle action.
    fn validate_revoke_plugin_authority(
        &self,
        ctx: &PluginValidationContext,
    ) -> Result<ValidationResult, ProgramError> {
        if let Some(Plugin::FreezeDelegate(freeze)) = ctx.target_plugin {
            if freeze.frozen {
                return reject!();
            } else if ctx.resolved_authorities.is_some()
                && ctx
                    .resolved_authorities
                    .unwrap()
                    .contains(ctx.self_authority)
            {
                return approve!();
            }
        }

        abstain!()
    }

    /// Validate the remove plugin lifecycle action.
    fn validate_remove_plugin(
        &self,
        ctx: &PluginValidationContext,
    ) -> Result<ValidationResult, ProgramError> {
        if ctx.target_plugin.is_some() && self.frozen {
            reject!()
        } else {
            abstain!()
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_freeze_delegate_len() {
        let freeze_delegate = FreezeDelegate::default();
        let serialized = freeze_delegate.try_to_vec().unwrap();
        assert_eq!(serialized.len(), freeze_delegate.len());
    }
}
