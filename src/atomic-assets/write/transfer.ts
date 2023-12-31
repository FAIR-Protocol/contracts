import { writeFn } from '../interfaces/common';
import { checkNumber } from '../utils/validate';

export const transfer: writeFn = (state, action) => {
  // caller checks
  ContractAssert(!!action.caller, 'Caller is required');
  ContractAssert(action.caller.length === 43, 'Caller is not valid');
  ContractAssert(action.caller !== action.input.target, 'Caller cannot be target');

  // targe checks
  ContractAssert(!!action.input.target, 'Missing "target" parameter in transfer');
  const target = action.input.target as string;
  ContractAssert(target.length === 43, 'Target is not valid');

  // qty checks
  const qty = checkNumber(action.input.qty);

  // state checks
  ContractAssert(!!state.balances[action.caller], 'Caller has no Balance');
  ContractAssert(state.balances[action.caller] >= qty, 'Caller has not enough balance');

  if (!state.balances[target]) {
    state.balances[target] = 0;
  }

  state.balances[action.caller] -= qty;
  state.balances[target] += qty;

  return { state };
};
