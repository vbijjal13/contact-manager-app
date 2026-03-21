import { describe, it, expect } from 'vitest'
import { isValidEmail, isValidPassword } from '../src/app/_lib/validator'

describe('validators', () => {
  it('validates emails correctly', () => {
    expect(isValidEmail('user@example.com')).toBe(true)
    expect(isValidEmail('user@')).toBe(false)
    expect(isValidEmail('')).toBe(false)
  })

  it('validates passwords correctly', () => {
    expect(isValidPassword('Abcdef1!')).toBe(true)
    expect(isValidPassword('short1!')).toBe(false) // too short
    expect(isValidPassword('allletters!!')).toBe(false) // no digit
    expect(isValidPassword('12345678!')).toBe(false) // no letter
    expect(isValidPassword('NoSpecial1')).toBe(false) // no special char
  })
})
