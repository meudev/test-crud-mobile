import React from 'react';
import { TouchableOpacityProps } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { ArticleDTO } from '../../dtos/ArticleDTO';

import { theme } from '../../theme';

import noImage from '../../assets/noImage.png';

import {
    Container,
    Content,
    ContentText,
    Image,
    SubTitle,
    Title,
} from './styles';

interface Props extends TouchableOpacityProps {
    data: ArticleDTO;
}

export function Article({
    data: article
}: Props) {
    const navigation = useNavigation<any>();

    function handle() {
        navigation.navigate("ViewArticle", { article });
    }

    return (
        <Container
            style={theme.shadowProp}
            onPress={handle}
        >
            <Image
                source={article.thumbnail === "" ? noImage : { uri: `${article.thumbnail}` }}
            />
            <Content>
                <Title>{article.title.substring(0, 20)}{article.title.length > 20 && "..."}</Title>
                <ContentText>
                    <SubTitle>{article.description.substring(0, 90)}{article.description.length > 90 && "..."}</SubTitle>
                </ContentText>
            </Content>
        </Container>
    );
}