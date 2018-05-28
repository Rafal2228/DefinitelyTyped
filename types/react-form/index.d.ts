// Type definitions for react-form 3.5.3
// Project: https://github.com/tannerlinsley/react-form#readme
// Definitions by: Cameron McAteer <https://github.com/cameron-mcateer>,
//                 Rafal2228 <https://github.com/rafal2228>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

import * as React from 'react';

export interface Nested<T> {
    [key: string]: T | Nested<T>;
}
export type Optional<T> = T | undefined;

export type FieldName = string | Array<string | number>;
export type FieldValue = any;
export type FormValues = Nested<FieldValue>;
export type FormErrors = Nested<Optional<string>>;
export type RenderFunction<T> = (props: T) => JSX.Element | boolean | null;

export type ValidationResult = string | {
    success: string;
    waring: string;
    error: string;
};

export interface RenderProps<InlineProps, ComponentProps> {
    component?: React.ComponentType<ComponentProps>;
    children?: React.ReactNode | RenderFunction<InlineProps>;
    render?: RenderFunction<InlineProps>;
}

// Form

export interface FormState {
    values: FormValues;
    touched: Nested<boolean>;
    errors: FormErrors;
    warnings: Nested<Optional<string>>;
    successes: Nested<Optional<string>>;
    submits: number;
    submitted: boolean;
    submitting: boolean;
    asyncValidations: number;
    validating: boolean;
    validationFailures: boolean;
    validationFailed: Nested<boolean>
}

export interface FormApi {
    submitForm: (event: React.SyntheticEvent<HTMLFormElement | any>) => void;
    setValue: (fieldName: FieldName, value: any) => void;
    setAllValues: (values: Nested<FieldValue>) => void;
    setError: (fieldName: string, error: string) => void;
    setWarning: (fieldName: string, warning: string) => void;
    setSuccess: (fieldName: string, success: string) => void;
    setTouched: (fieldName: string, touched: boolean) => void;
    setAllTouched: () => void;
    addValue: (fieldName: string, value: any) => void;
    removeValue: (fieldName: string, index: number) => void;
    swapValues: (fieldName: string, firstIndex: number, secondIndex: number) => void;
    resetAll: () => void;
    getFormState: () => FormState;
    setFormState: (state: FormState) => void;
}

export interface FormProps extends RenderProps<FormState & FormApi, { formApi: FormState & FormApi }> {
    pure?: boolean;
    validateOnMount?: boolean;
    validateOnSubmit?: boolean;
    defaultValues?: FormValues;
    preventDefault?: boolean;

    onSubmit?: (values: FormValues, event: React.SyntheticEvent<React.FormHTMLAttributes<FormValues>>, formApi: FormApi) => void;
    preSubmit?: (values: FormValues) => FormValues;
    onSubmitFailure?: (errors: FormErrors, onSubmitError: Error, formApi: FormApi) => void;
    onChange?: (formState: FormState, formApi: FormApi) => void;
    validate?: (values: FormValues) => Nested<ValidationResult>;
    preValidate?: (values: FormValues) => FormValues;
    asyncValidate?: (values: FormValues) => Promise<Nested<ValidationResult>>;
    getApi?: (formApi: FormApi) => void;
}

export interface FormContext {
    formApi: FormApi;
    formState: FormState;
    formProps: FormProps;
}

export declare class Form extends React.Component<FormProps> implements React.ChildContextProvider<FormContext> {
    getChildContext(): FormContext;
}

// Field

export interface FieldState {
    value: FieldValue;
    error: string;
    warning: string;
    success: string;
    touched: boolean;
    fieldName: string;
}

export interface FieldApi {
    setValue: (value: FieldValue) => void;
    setError: (error: string) => void;
    setWarning: (error: string) => void;
    setSuccess: (error: string) => void;
    setTouched: (touched: boolean) => void;
    addValue: (subField: FieldName, value: FieldValue) => void;
    removeValue: (subField: FieldName, value: FieldValue) => void;
    swapValues: (subField: FieldName, firstIndex: number, secondIndex: number) => void;
    reset: () => void;
    validatingField: () => void;
    doneValidatingField: () => void;
    validate: () => void;
    preValidate: () => void;
    asyncValidate: () => void;
}

export interface FieldProps extends RenderProps<FieldState & FieldApi, { fieldApi: FieldState & FieldApi }> {
    field: FieldName;
    pure?: boolean;
    validate?: (value: FieldValue) => ValidationResult;
    preValidate?: (value: FieldValue) => FieldValue;
    asyncValidate?: (value: FieldValue) => Promise<FieldValue>;
}

export declare class Field extends React.Component<FieldProps> {}

// NestedField

