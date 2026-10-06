import { useCallback, useId, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

import { Icon } from './ui/Icon';
import { ApiError, api } from '../lib/api';
import {
  ERROR_MESSAGE,
  LIMITS,
  SUCCESS_MESSAGE,
  initialContactValues,
  validateAll,
  validateField,
} from '../lib/contactValidation';
import { EASE_OUT_EXPO } from '../lib/motion';
import { cn } from '../lib/cn';

const FIELDS = [
  {
    name: 'name',
    label: 'Name',
    type: 'text',
    autoComplete: 'name',
    placeholder: 'Your full name',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    autoComplete: 'email',
    inputMode: 'email',
    placeholder: 'you@example.com',
  },
  {
    name: 'subject',
    label: 'Subject',
    type: 'text',
    autoComplete: 'off',
    placeholder: 'Project inquiry / collaboration',
  },
];

export function ContactForm() {
  const formId = useId();
  const reduce = useReducedMotion();

  const [values, setValues] = useState(initialContactValues);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [formMessage, setFormMessage] = useState('');

  const messageKey = useRef(0);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;

      setValues((current) => ({ ...current, [name]: value }));

      setErrors((current) => {
        if (!current[name]) return current;
        return { ...current, [name]: validateField(name, value) };
      });

      if (status === 'error') {
        setStatus('idle');
        setFormMessage('');
      }
    },
    [status],
  );

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    const error = validateField(name, value);
    setErrors((current) => ({ ...current, [name]: error }));
  }, []);

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const nextErrors = validateAll(values);
      const hasErrors = Object.values(nextErrors).some(Boolean);

      if (hasErrors) {
        setErrors(nextErrors);
        setStatus('error');
        setFormMessage(ERROR_MESSAGE);

        const firstInvalid = Object.keys(nextErrors).find((field) => nextErrors[field]);
        if (firstInvalid) {
          document.getElementById(`${formId}-${firstInvalid}`)?.focus();
        }
        return;
      }

      setStatus('submitting');
      setFormMessage('');

      try {
        await api.contact({
          name: values.name.trim(),
          email: values.email.trim(),
          subject: values.subject.trim(),
          message: values.message.trim(),
        });

        messageKey.current += 1;
        setValues(initialContactValues);
        setErrors({});
        setStatus('success');
        setFormMessage(SUCCESS_MESSAGE);
      } catch (error) {
        messageKey.current += 1;
        setStatus('error');

        if (error instanceof ApiError && error.fieldErrors) {
          setErrors((current) => ({ ...current, ...error.fieldErrors }));
        }

        setFormMessage(ERROR_MESSAGE);
      }
    },
    [formId, values],
  );

  const isSubmitting = status === 'submitting';
  const messageId = `${formId}-form-message`;

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="rounded-[22px] border border-[#DDE8D8] bg-white p-5 shadow-soft sm:p-8 max-w-full min-w-0"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {FIELDS.map((field) => (
          <Field
            key={field.name}
            {...field}
            id={`${formId}-${field.name}`}
            value={values[field.name]}
            error={errors[field.name]}
            disabled={isSubmitting}
            maxLength={field.name === 'email' ? 254 : LIMITS[field.name]?.max}
            onChange={handleChange}
            onBlur={handleBlur}
            containerClassName={field.name === 'subject' ? 'sm:col-span-2' : undefined}
          />
        ))}
      </div>

      <Field
        name="message"
        label="Message"
        id={`${formId}-message`}
        as="textarea"
        rows={5}
        value={values.message}
        error={errors.message}
        disabled={isSubmitting}
        maxLength={LIMITS.message.max}
        placeholder="Tell me about your project, idea, or role opportunity."
        onChange={handleChange}
        onBlur={handleBlur}
      />

      <div className="mt-7 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[0.6875rem] leading-relaxed text-[#6c8471] break-words">
          Direct transmission straight to my verified inbox.
        </p>

        {/* Submit button: Deep Green background with white text */}
        <button
          type="submit"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
          className="inline-flex h-12 w-full sm:w-auto items-center justify-center gap-2.5 rounded-control bg-[#2E5D3B] px-8 text-[0.9375rem] font-semibold text-white shadow-soft transition-all duration-200 hover:bg-[#244b2f] hover:shadow-lift active:translate-y-px disabled:pointer-events-none disabled:opacity-70 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Icon name="LoaderCircle" size={17} className="animate-spin motion-reduce:animate-none" />
              Transmitting...
            </>
          ) : (
            <>
              Send Message
              <Icon name="Send" size={16} />
            </>
          )}
        </button>
      </div>

      {/* Live Region Alert */}
      <div
        id={messageId}
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="mt-5 min-h-[1.5rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {formMessage ? (
            <motion.p
              key={`${status}-${messageKey.current}`}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={reduce ? { duration: 0 } : { duration: 0.28, ease: EASE_OUT_EXPO }}
              className={cn(
                'flex items-start gap-2.5 rounded-control border px-4 py-3 text-sm font-medium',
                status === 'success'
                  ? 'border-[#C8E6C9] bg-[#E8F5E9] text-[#2E5D3B]'
                  : 'border-[#DDE8D8] bg-[#FAFDF7] text-[#2E5D3B]',
              )}
            >
              <Icon
                name={status === 'success' ? 'CheckCircle2' : 'AlertCircle'}
                size={17}
                className={cn('mt-px shrink-0', status === 'success' && 'text-[#2E5D3B]')}
              />
              {formMessage}
            </motion.p>
          ) : null}
        </AnimatePresence>
      </div>
    </form>
  );
}

function Field({
  id,
  name,
  label,
  as = 'input',
  error,
  value,
  onChange,
  onBlur,
  disabled,
  containerClassName,
  ...inputProps
}) {
  const describedBy = error ? `${id}-error` : undefined;
  const Component = as;

  return (
    <div className={cn('flex flex-col gap-2 min-w-0', as === 'textarea' && 'mt-5', containerClassName)}>
      <label htmlFor={id} className="text-sm font-semibold text-[#172117]">
        {label}
      </label>

      {/* Input focus border becomes light green (#C8E6C9) / deep green (#2E5D3B) */}
      <Component
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={describedBy}
        className={cn(
          cn(
            'w-full border bg-white px-4 text-[0.9375rem] text-[#172117]',
            as === 'textarea' ? 'rounded-[16px] py-3' : 'h-11 rounded-control',
          ),
          'placeholder:text-[#6c8471]/80',
          'transition-all duration-200',
          'focus:outline-none',
          'disabled:cursor-not-allowed disabled:bg-[#FAFDF7] disabled:text-[#6c8471]',
          error
            ? 'border-[#2E5D3B] focus:border-[#2E5D3B] focus:ring-2 focus:ring-[#2E5D3B]/25'
            : 'border-[#DDE8D8] focus:border-[#2E5D3B] focus:ring-2 focus:ring-[#C8E6C9]',
          as === 'textarea' && 'resize-y leading-relaxed',
        )}
        {...inputProps}
      />

      {error ? (
        <p
          id={`${id}-error`}
          className="flex items-start gap-1.5 text-[0.8125rem] font-medium leading-snug text-[#2E5D3B]"
        >
          <Icon name="AlertCircle" size={14} className="mt-px shrink-0" />
          {error}
        </p>
      ) : null}
    </div>
  );
}

export default ContactForm;
