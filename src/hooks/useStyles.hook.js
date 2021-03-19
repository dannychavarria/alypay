import { StyleSheet } from 'react-native'

/**
 * Verify if a style is a valid
 * @param {Object} style - style sentence to evaluate
 */
export const checkValidStyle = style => {
    if (typeof style !== 'object') {
        return false
    }

    const allNotObjectValues = Object.values(style).find(
        current => typeof current !== 'object'
    )

    if (allNotObjectValues !== undefined) {
        return false
    }

    return true
}

/**
 * Take a js object and convert to StyleSheet React-Native
 * @param {Array[Object]} arguments
 * @return {StyleSheet}
 */
export default function useStyles(...styles) {
    // Verify is arguments length is > 0
    if (styles.length === 0) {
        throw String('useStyles: without styles to process')
    }

    // Storage styles arguments to concat
    let combinedStyles = {}

    for (let style of styles) {
        // Verify valid style
        if (!checkValidStyle(style)) {
            throw String('useStyle: style is not a valid sentence')
        }

        combinedStyles = { ...combinedStyles, ...style }
    }

    return StyleSheet.create(combinedStyles)
}
