import { TouchableOpacity } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ButtonProps {
    color: string;
}
interface ButtonTextProps {
    color: string;
}

export const Container = styled(TouchableOpacity)<ButtonProps>`
    width: 100%;

    padding: 19px;
    align-items: center;
    justify-content: center;

    background-color: ${({ color }) => color};
    margin-bottom: 8px;

    border-radius: 5px;
`;

export const Title = styled.Text<ButtonTextProps>`
    font-size: ${RFValue(15)}px;
    color: ${({ color }) => color};
`;