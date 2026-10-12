'use client'

import { useState } from 'react'
import PhoneInput from 'react-phone-number-input'
import {
    isValidPhoneNumber,
    parsePhoneNumber,
} from 'libphonenumber-js'

import 'react-phone-number-input/style.css'

type PhoneNumberFieldProps = {
    label?: string
    value?: string
    onChange?: (value?: string) => void
    required?: boolean
    error?: string
}

export default function PhoneNumberField({
    label = 'Phone Number',
    value,
    onChange,
    required = false,
    error,
}: PhoneNumberFieldProps) {
    const [touched, setTouched] = useState(false)

    const isInvalid =
        touched &&
        value &&
        !isValidPhoneNumber(value)

    const handleChange = (val?: string) => {
        onChange?.(val)
    }

    const getNationalFormat = () => {
        if (!value) return ''
        try {
            const phone = parsePhoneNumber(value)
            return phone.formatNational()
        } catch {
            return ''
        }
    }

    return (
        <div className="space-y-1">
            {label && (
                <label className="block text-sm font-medium">
                    {label} {required && '*'}
                </label>
            )}

            <PhoneInput
                defaultCountry="US"
                international={false}      // national mode
                countryCallingCodeEditable={false}
                value={value}
                onChange={handleChange}
                onBlur={() => setTouched(true)}
                className="border rounded px-3 py-2 w-full [>input]:border-none custom-phone-input"

            />

            {/* Validation */}
            {isInvalid && (
                <p className="text-sm text-red-500">
                    Please enter a valid phone number.
                </p>
            )}

            {/* External error */}
            {error && (
                <p className="text-sm text-red-500">{error}</p>
            )}

            {/* Debug / optional display */}
            {value && (
                <p className="text-xs text-gray-500 d-none" style={{ display: 'none' }}>
                    Stored (E.164): {value} <br />
                    National: {getNationalFormat()}
                </p>
            )}
        </div>
    )
}
