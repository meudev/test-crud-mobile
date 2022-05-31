import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { theme } from '../../theme';

import {
    Container,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps {
    title: string;
    type?: 'primary' | 'secondary';
}

export function Button({ 
    title,
    type = 'primary',
    onPress
}: Props) {
    return (
        <Container
            color={type === 'primary' ?  theme.colors.secondary : theme.colors.neutral}
            onPress={onPress}
        >
            <Title
                color={type === 'primary' ?  theme.colors.neutral : theme.colors.primary}
            >
                {title}
            </Title>
        </Container>
    );
}