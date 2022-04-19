import React, { useState } from 'react';
import { Alert, Button, Modal, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native';
import { VideoPlayer } from './VideoPlayer';
import CameraRoll from '@react-native-community/cameraroll';

const defaultSource = 'https://cdn81168665.blazingcdn.net/timeline/hartley-e001-s001a-01-2b6d4c/stream/index.m3u8';

const App = () => {
    const [visible, setVisible] = useState(false);
    const [start, setStart] = useState(0);
    const [uri, setUri] = useState(defaultSource);
    const hideModal = () => setVisible(false);

    const play = (from: number) => {
        setStart(from);
        setVisible(true);
    };

    const getAlbumVideo = async () => {
        const { edges } = await CameraRoll.getPhotos({ first: 1, assetType: 'Videos' });
        if (edges.length <= 0) {
            Alert.alert('There are no videos in the album', 'Please add the video to the album and then test');
            return;
        }
        setUri(edges[0].node.image.uri);
        setVisible(true);
    };

    return (
        <SafeAreaView>
            <View style={{ marginTop: '40%' }}>
                <Button title="PLAY (start)" onPress={() => play(0)} />
                <Button title="PLAY (1 second in)" onPress={() => play(1)} />
                <Button title="PLAY ALBUM VIDEO" onPress={getAlbumVideo} />
            </View>
            <Modal
                visible={visible}
                animationType="fade"
                onDismiss={hideModal}
                onRequestClose={hideModal}
                presentationStyle={'overFullScreen'}>
                <View style={styles.outter}>
                    <StatusBar hidden />
                    <View style={styles.inner}>
                        <VideoPlayer uri={uri} start={start} onFinished={hideModal} />
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    outter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default App;
