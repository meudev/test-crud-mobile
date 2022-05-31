import React from 'react';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
    ButtonBack,
    Container,
    Content,
    Title
} from './styles';

import { theme } from '../../theme';

interface Props {
    title: string;
}

export function Header({
    title
}: Props) {
    const navigation = useNavigation<any>();
    
    function handleBack() {
        navigation.goBack();
    }

    return (
        <Container>
            <StatusBar
                barStyle="light-content"
                backgroundColor="transparent"
                translucent
            />
            <Content>
                <ButtonBack
                    onPress={handleBack}
                >
                    <MaterialCommunityIcons
                        name="arrow-left"
                        size={24}
                        color={theme.colors.neutral}
                    />
                </ButtonBack>
                <Title>{title.substring(0, 23)}{title.length > 23 && "..."}</Title>
            </Content>
        </Container>
    );
}