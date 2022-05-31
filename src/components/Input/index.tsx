import React, { useState } from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';

import {
    Container,
    IconContainer,
    InputText,
    Line,
} from './styles';

import { theme } from '../../theme';

interface Props extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value: string;
    onPress?: () => void;
}

export function Input({
    iconName,
    value,
    onPress,
    ...rest
}: Props) {
    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    function handleInputFocus() {
        setIsFocused(true);
    }

    function handleInputBlur() {
        setIsFocused(false);
        setIsFilled(!!value);
    }

    return (
        <Container>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.primary : theme.colors.input_secondary}
                />
            </IconContainer>
            <InputText
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                isFocused={isFocused}
                placeholderTextColor={theme.colors.input_secondary}
                {...rest}
            />
            {isFocused && <Line />}
        </Container>
    );
}