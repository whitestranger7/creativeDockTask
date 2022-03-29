import React, {
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from 'react'
import { View, TextInput } from 'react-native'
import {
  StyleService,
} from '@ui-kitten/components'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const CELLS_COUNT = 6

export interface CodeInputProps {
  onSubmit: (code: string) => void
}

export interface CodeInputRef {
  clearData: () => void
  focus: () => void
}

export const CodeInput = forwardRef<
  CodeInputRef,
  CodeInputProps
>(({ onSubmit }, ref) => {
  const [code, setCode] = useState('')

  const refs = useRef(
    Array.from({ length: CELLS_COUNT }).map(() => useRef<TextInput>(null)),
  )

  const focusInputCell = (index: number = 0) => refs.current[index].current?.focus()

  useImperativeHandle(ref, () => ({
    clearData: () => {
      setCode('')
    },
    focus: focusInputCell,
  }))

  const updateCode = (value: string) => {
    if (code.length < CELLS_COUNT && value) {
      setCode(code + value)
      if (code.length < CELLS_COUNT - 1) {
        focusInputCell(code.length + 1)
      } else {
        refs.current[code.length].current?.blur()
      }
    }
  }

  useEffect(() => {
    const timer = setTimeout(focusInputCell, 1)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    if (code.length === CELLS_COUNT) {
      onSubmit(code)
    }
  }, [code])

  const removeCodeCharacter = () => {
    if (code.length > 0) {
      setCode(code.slice(0, -1))
      focusInputCell(code.length - 1)
    }
  }

  const renderCells = () => {
    const cells = []
    for (let i = 0; i < CELLS_COUNT; i++) {
      const isLast = i === CELLS_COUNT - 1
      cells.push(
        <View
          style={[
            styles.cell,
            !isLast && styles.cellMargin,
          ]}
          key={i}
        >
          <TextInput
            ref={refs.current[i]}
            style={styles.cellText}
            keyboardType='number-pad'
            caretHidden
            textContentType='oneTimeCode'
            value={code[i]}
            placeholderTextColor='black'
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                removeCodeCharacter()
              }
            }}
            onChangeText={(value) => updateCode(value[value.length - 1])}
          />
        </View>,
      )
    }
    return cells
  }

  return (
    <View>
      <TouchableWithoutFeedback
        style={styles.inputContainer}
      >
        {renderCells()}
      </TouchableWithoutFeedback>
    </View>
  )
})

const styles = StyleService.create({
  inputContainer: {
    flexDirection: 'row',
  },
  cell: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellMargin: {
    marginRight: 10,
  },
  cellText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    flex: 1,
  },
})