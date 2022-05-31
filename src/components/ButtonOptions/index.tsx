import React from 'react';
import { Feather } from '@expo/vector-icons';

import { ArticleDTO } from '../../dtos/ArticleDTO';
import { TouchableOpacityProps } from 'react-native';

import {
    Container
} from './styles';
import { theme } from '../../theme';

interface Props extends TouchableOpacityProps{
    type: "delete" | "edit";
}

export function ButtonOptions({
    type,
    onPress
}: Props) {
    return (
        <Container
            style={theme.shadowProp}
            onPress={onPress}
        >
            <Feather
                name={type === 'edit' ? 'edit-2' : 'trash'}
                size={24}
                color={theme.colors.neutral}
            />
        </Container>
    );
}