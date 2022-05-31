import styled, { css } from 'styled-components/native';
import { TextInput } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import { theme } from '../../theme';

interface Props {
    isFocused: boolean;
}

export const Container = styled.View`
    flex-direction: row;
    
    margin-bottom: 10px;
    border: 2px;
    border-color: ${theme.colors.input};
    border-radius: 5px;
    
    background-color: ${theme.colors.input};
`;

export const IconContainer = styled.View`
    height: 56px;
    width: 54px;
    justify-content: center;
    align-items: center;

    margin-right: 2px;

    background-color: ${theme.colors.neutral};
`;

export const InputText = styled(TextInput)<Props>`
    flex: 1;

    font-size: ${RFValue(14)}px;
    color: ${theme.colors.primary};

    padding: 0 20px;

    background-color: ${theme.colors.neutral};
`;

export const Line = styled.View`
    position: absolute;
    bottom: -2px;
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-color: ${theme.colors.primary};
`;
