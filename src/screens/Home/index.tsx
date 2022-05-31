import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { MaterialCommunityIcons, AntDesign } from '@expo/vector-icons';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hook/auth';
import api from '../../services/api';

import { ArticleDTO } from '../../dtos/ArticleDTO';
import { Article } from '../../components/Article';
import { Alert, ShowAlertProps } from '../../components/Alert';

import { theme } from '../../theme';

import {
    Container,
    Content,
    Header,
    Title,
    Logout,
    ListArticles,
    ButtonFloating,
} from './styles';

export function Home() {
    const { user, access, signOut } = useAuth();
    const navigation = useNavigation<any>();
    const screenIsFocus = useIsFocused();
    const [listArticles, setListArticles] = useState<ArticleDTO[]>([]);
    const [dataShowAlert, setDataShowAlert] = useState<ShowAlertProps>({ data: {} } as ShowAlertProps);

    async function searchListArticles() {
        try {
            const response = await api.get('/article/all', {
                headers: {
                    Authorization: `Bearer ${access.token}`
                }
            });

            const article = response.data;

            setListArticles(article);
        } catch (error) {
            console.log(error)
            throw new Error(error as any);
        }
    }

    function handleNewArticle() {
        navigation.navigate("NewArticle");
    }

    function handleLogout() {
        setDataShowAlert({
            data: {
                title: "Atenção!",
                message: "Você realmente deseja sair?",
                type: "confirmation",
                active: true,
                confirmText: "Sim",
                cancelText: "Não",
                handleConfirm: handleConfirmShowAlertSignOut
            }
        })
    }

    function handleConfirmShowAlertSignOut() {
        signOut()
    }

    useEffect(() => {
        searchListArticles()
    }, [screenIsFocus])


    return (
        <Container>
            <Alert data={dataShowAlert.data} />
            <Header>
                <StatusBar
                    barStyle="light-content"
                    backgroundColor="transparent"
                    translucent
                />
                <Content>
                    <Title>Olá, {user.username}</Title>
                    <Logout
                        onPress={handleLogout}
                    >
                        <MaterialCommunityIcons
                            name="logout"
                            size={24}
                            color={theme.colors.neutral}
                        />
                    </Logout>
                </Content>
            </Header>
            <ListArticles
                data={listArticles}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                    <Article data={item} />
                }
            />
            <ButtonFloating
                activeOpacity={0.7}
                onPress={handleNewArticle}
                style={theme.shadowProp}
            >
                <AntDesign
                    name="addfile"
                    size={24}
                    color={theme.colors.neutral}
                />
            </ButtonFloating>
        </Container>
    );
}