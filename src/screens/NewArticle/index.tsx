import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { useAuth } from '../../hook/auth';

import { Alert, ShowAlertProps } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';

import {
    Container,
    Form,
} from './styles';
import api from '../../services/api';

export function NewArticle() {
    const { access } = useAuth();
    const navigation = useNavigation<any>();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [body, setBody] = useState('');
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

            const response = await api.post('/article/create', {
                title,
                description,
                body
            }, {
                headers: {
                    Authorization: `Bearer ${access.token}`
                }
            });

            console.log(response)

            if (response.status === 201) {
                setDataShowAlert({
                    data: {
                        title: "Uhuuu!",
                        message: 'Artigo cadastrado com sucesso.',
                        type: "alert",
                        active: true,
                        confirmText: "OK",
                        handleConfirm: handleConfirmShowAlertSend
                    }
                })
            }

        } catch (error) {
            console.log(error)
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
                        message: "Erro ao enviar os dados.",
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
                    <Header title='ENVIAR NOVO ARTIGO' />
                    <Form>
                        <Input
                            iconName='award'
                            value={title}
                            onChangeText={setTitle}
                            placeholder='Digite o título'
                        />
                        <Input
                            iconName='edit'
                            value={description}
                            onChangeText={setDescription}
                            placeholder='Digite a descrição.'
                        />
                        <Input
                            iconName='align-justify'
                            value={body}
                            onChangeText={setBody}
                            placeholder='Descreva o seu artigo.'
                        />
                        <Button
                            title="ENVIAR"
                            onPress={handleSendArticle}
                        />
                    </Form>
                </Container>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}