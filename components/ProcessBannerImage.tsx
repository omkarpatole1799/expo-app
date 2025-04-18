import React from 'react';
import { Image, View } from 'react-native';

interface ProcessBannerImagePropsInterface {
    processUrl: string | null;
}

const ProcessBannerImage: React.FC<ProcessBannerImagePropsInterface> = ({ processUrl }) => {
    console.log(processUrl, 'processUrl');
    return (
        <>
            {processUrl && (
                <View
                    style={{
                        height: 100,
                        width: '100%',
                        borderRadius: 10,
                        overflow: 'hidden',
                    }}>
                    <Image
                        style={{
                            height: '100%',
                            width: '100%',
                            resizeMode: 'stretch',
                        }}
                        source={{
                            uri: `${processUrl}/assets/images/brand-name.jpg`,
                        }}
                    />
                </View>
            )}
        </>
    );
};

export default ProcessBannerImage;
