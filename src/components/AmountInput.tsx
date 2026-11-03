import React, { useRef, useState } from 'react';
import { MAX_AMOUNT, formatAmount, parseAmountText, toDigits } from '../utils/amount';

interface Props extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'type'> {
  value: number;
  onValueChange: (value: number) => void;
  max?: number;
  /** Render without thousands separators (e.g. percentages). */
  plain?: boolean;
}

/**
 * Numeric text input: integers only, clamped to [0, max], shown with
 * thousands separators while the state stays a plain number.
 */
const AmountInput: React.FC<Props> = ({ value, onValueChange, max = MAX_AMOUNT, plain, className = '', ...rest }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [capped, setCapped] = useState(false);
  const display = plain ? (value > 0 ? String(value) : '') : formatAmount(value);

  const lastKey = useRef<string>('');

  const placeCaret = (digitsBeforeCaret: number) => {
    // Keep the caret after the same digit once separators are re-inserted.
    requestAnimationFrame(() => {
      const input = ref.current;
      if (!input || document.activeElement !== input) return;
      let pos = 0;
      let seen = 0;
      while (pos < input.value.length && seen < digitsBeforeCaret) {
        if (/\d/.test(input.value.charAt(pos))) seen += 1;
        pos += 1;
      }
      input.setSelectionRange(pos, pos);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    let digitsBeforeCaret = toDigits(el.value.slice(0, caret)).length;
    let text = el.value;

    // Deleting only a thousands separator leaves the number unchanged and the
    // caret stuck; delete the neighbouring digit instead (Delete: right, else left).
    const oldDigits = toDigits(display);
    const newDigits = toDigits(text);
    if (!plain && newDigits === oldDigits && text.length < display.length && newDigits.length > 0) {
      const idx = lastKey.current === 'Delete' ? digitsBeforeCaret : digitsBeforeCaret - 1;
      if (idx >= 0 && idx < newDigits.length) {
        text = newDigits.slice(0, idx) + newDigits.slice(idx + 1);
        digitsBeforeCaret = idx;
      }
    }

    const result = parseAmountText(text, max);
    setCapped(result.capped);
    onValueChange(result.value);
    placeCaret(digitsBeforeCaret);
  };

  return (
    <>
      <input
        ref={ref}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        placeholder="0"
        className={className}
        value={display}
        onChange={handleChange}
        onKeyDown={(e) => { lastKey.current = e.key; }}
        onBlur={() => setCapped(false)}
        {...rest}
      />
      {capped && (
        <span role="status" className="sr-only">
          已調整為上限 {max.toLocaleString('en-US')}
        </span>
      )}
    </>
  );
};

export default AmountInput;
