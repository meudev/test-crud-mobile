import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Yup from 'yup';

import { useAuth } from '../../hook/auth';
import api from '../../services/api';

import { ArticleDTO } from '../../dtos/ArticleDTO';

import { Alert, ShowAlertProps } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

interface Params {
    article: ArticleDTO;
}

import {
    Container,
    Form,
} from './styles';

export function EditArticle() {
    const { access } = useAuth();
    const route = useRoute();
    const { article } = route.params as Params;
    const navigation = useNavigation<any>();
    const [title, setTitle] = useState(article.title);
    const [description, setDescription] = useState(article.description);
    const [body, setBody] = useState(article.body);
    const [dataShowAlert, setDataShowAlert] = useState<ShowAlertProps>({ data: {} } as ShowAlertProps);

    async function handleSendArticle() {
        Keyboard.dismiss()
        try {

            const schema = Yup.object().shape({
                body: Yup.string()
                    .required('É obrigatório descrever seus artigo.'),
                description: Yup.string()
                    .required('É obrigatório a descrição do artigo.'),
                title: Yup.string()
                    .required('É obrigatório o título do artigo'),
            });

            const data = { title, description, body };

            await schema.validate(data);

            const response = await api.put(`/article/update/${article.id}`, {
                title,
                description,
                body
            }, {
                headers: {
                    Authorization: `Bearer ${access.token}`
                }
            });

            if (response.status === 200) {
                setDataShowAlert({
                    data: {
                        title: "Uhuuu!",
                        message: 'Artigo alterado com sucesso.',
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlertSend
                    }
                })
            }

        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: `${error.message}`,
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })

            } else {
                setDataShowAlert({
                    data: {
                        title: "Opss!",
                        message: "Erro ao salvar os dados.",
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlert
                    }
                })
            }
        }
    }

    function handleConfirmShowAlert() {
        setDataShowAlert({ data: {} } as ShowAlertProps);
    };

    function handleConfirmShowAlertSend() {
        setDataShowAlert({ data: {} } as ShowAlertProps);
        navigation.navigate("Home");

    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                    <Alert data={dataShowAlert.data} />
                    <Header title='EDITAR ARTIGO' />
                    <Form>
                        <Input
                            iconName='award'
                            value={title}
                            defaultValue={article.title}
                            onChangeText={setTitle}
                            placeholder='Digite o título'
                        />
                        <Input
                            iconName='edit'
                            value={description}
                            defaultValue={article.description}
                            onChangeText={setDescription}
                            placeholder='Digite a descrição.'
                        />
                        <Input
                            iconName='align-justify'
                            value={body}
                            defaultValue={article.body}
                            onChangeText={setBody}
                            placeholder='Descreva o seu artigo.'
                        />
                        <Button
                            title="SALVAR"
                            onPress={handleSendArticle}
                        />
                    </Form>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}