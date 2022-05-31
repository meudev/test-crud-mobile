import styled from 'styled-components/native';

import { theme } from '../../theme';

export const Container = styled.TouchableOpacity`
    width: 40px;
    height: 40px;

    justify-content: center;
    align-items: center;

    border-radius: 30px;

    background-color: ${theme.colors.primary};
`;