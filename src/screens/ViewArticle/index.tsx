import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '../../hook/auth';

import { ArticleDTO } from '../../dtos/ArticleDTO';
import { ButtonOptions } from '../../components/ButtonOptions';
import { Alert, ShowAlertProps } from '../../components/Alert';
import { Header } from '../../components/Header';

import noImage from '../../assets/noImage.png';

interface Params {
    article: ArticleDTO;
}

import {
    Container,
    ContentArticle,
    Thumbnail,
    ArticleTitle,
    ArticleBody,
    ArticleDescription,
    ContentText,
    ContentOptions
} from './styles';
import api from '../../services/api';

export function ViewArticle() {
    const navigation = useNavigation<any>();
    const { access } = useAuth();
    const route = useRoute();
    const { article } = route.params as Params;
    
    const [dataShowAlert, setDataShowAlert] = useState<ShowAlertProps>({ data: {} } as ShowAlertProps);


    function handleEdit(article: ArticleDTO) {
        navigation.navigate("EditArticle", { article });
    }

    async function handleDelete() {
        setDataShowAlert({
            data: {
                title: "Atenção!",
                message: "Você deseja realmente excluir este artigo?",
                type: "confirmation",
                active: true,
                confirmText: "Sim",
                cancelText: "Não",
                handleConfirm: handleConfirmShowAlertDelete
            }
        })
    }

    async function handleConfirmDelete() {
        console.log(article)
        try {
            const response = await api.delete(`/article/delete/${article.id}`, {
                headers: {
                    Authorization: `Bearer ${access.token}`
                }
            });

            console.log(response.status)
            if (response.status === 200) {
                navigation.navigate("Home");
            }

        } catch (error) {
            console.log(error)
            setDataShowAlert({
                data: {
                    title: "Opss!",
                    message: "Erro ao excluir.",
                    type: "alert",
                    active: true,
                    confirmText: "OK",
                    handleConfirm: handleConfirmShowAlert
                }
            })

        }
    }

    function handleConfirmShowAlert() {
        setDataShowAlert({ data: {} } as ShowAlertProps);
    };

    function handleConfirmShowAlertDelete() {
        setDataShowAlert({ data: {} } as ShowAlertProps);
        handleConfirmDelete()
    };

    useEffect(() => {
        
    },[])

    return (
        <Container>
            <Alert data={dataShowAlert.data} />
            <Header title={article.title} />
            <ContentArticle>
                <Thumbnail
                    source={article.thumbnail === "" ? noImage : { uri: `${article.thumbnail}` }}
                    resizeMode="cover"
                >
                    <ContentOptions>
                        <ButtonOptions
                            type='edit'
                            onPress={() => handleEdit(article)}
                        />
                        <ButtonOptions
                            type='delete'
                            onPress={() => handleDelete()}
                        />
                    </ContentOptions>
                </Thumbnail>

                <ContentText>
                    <ArticleTitle>{article.title}</ArticleTitle>
                </ContentText>
                <ContentText>
                    <ArticleDescription>{article.description}</ArticleDescription>
                </ContentText>
                <ContentText>
                    <ArticleBody>{article.body}</ArticleBody>
                </ContentText>

            </ContentArticle>
        </Container >
    );
}