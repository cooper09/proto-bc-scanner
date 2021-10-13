
import React, {useState, useEffect} from 'react';
import {Button, Dimensions, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View } from 'react-native';
import {BarCodeScanner, BarCodeScannerResult} from 'expo-barcode-scanner';
import BarcodeMask from 'react-native-barcode-mask';

const finderWidth: number = 280;
const finderHeight: number = 230;
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const viewMinX = (width - finderWidth) / 2;
const viewMinY = (height - finderHeight) / 2;

export default function App() {

  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(BarCodeScanner.Constants.Type.back);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
            (async () => {
                const {status} = await BarCodeScanner.requestPermissionsAsync();
                setHasPermission(status === 'granted');
            })();
        }, []);

        const handleBarCodeScanned = (scanningResult) => {
                  if (!scanned) {
                      const {type, data, bounds: {origin} = {}} = scanningResult;
                      // @ts-ignore
                      const {x, y} = origin;
                      if (x >= viewMinX && y >= viewMinY && x <= (viewMinX + finderWidth / 2) && y <= (viewMinY + finderHeight / 2)) {
                          setScanned(true);
                          alert(`Bar code with type ${type} and data ${data} has been scanned!`);
                      }
                  }
              };
       
  if (hasPermission === null) {
      return <Text>Requesting for camera permission</Text>;
  }

  if (hasPermission === false) {
      return <Text>No access to camera</Text>;
  }

  return (
    <View style={{flex: 1}}>
      <Text>Coop has done it again....</Text>
      <Text>Open up App.js to start working on your app!</Text>
    
      <BarCodeScanner onBarCodeScanned={handleBarCodeScanned}
                            type={type}
                            barCodeTypes={[
                                BarCodeScanner.Constants.BarCodeType.qr, 
                                BarCodeScanner.Constants.BarCodeType.aztec,
                                BarCodeScanner.Constants.BarCodeType.codabar,
                                BarCodeScanner.Constants.BarCodeType.code39,
                                BarCodeScanner.Constants.BarCodeType.code93,
                                BarCodeScanner.Constants.BarCodeType.code128,
                                BarCodeScanner.Constants.BarCodeType.code39mod43,
                                BarCodeScanner.Constants.BarCodeType.datamatrix,
                                BarCodeScanner.Constants.BarCodeType.ean13,
                                BarCodeScanner.Constants.BarCodeType.ean8,
                                BarCodeScanner.Constants.BarCodeType.interleaved2of5,
                                BarCodeScanner.Constants.BarCodeType.itf14,
                                BarCodeScanner.Constants.BarCodeType.maxicode,
                                BarCodeScanner.Constants.BarCodeType.pdf417,
                                BarCodeScanner.Constants.BarCodeType.rss14,
                                BarCodeScanner.Constants.BarCodeType.rssexpanded,
                                BarCodeScanner.Constants.BarCodeType.upc_a,
                                BarCodeScanner.Constants.BarCodeType.upc_e,
                                BarCodeScanner.Constants.BarCodeType.upc_ean
                        
                            ]}
                            style={[StyleSheet.absoluteFillObject, styles.container]}>
                <View
                    style={{
                        flex: 1,
                        backgroundColor: 'transparent',
                        flexDirection: 'row',
                    }}>

                    <TouchableOpacity
                        style={{
                            flex: 1,
                            alignItems: 'flex-end',
                        }}
                        onPress={() => {
                            setType(
                                type === BarCodeScanner.Constants.Type.back
                                    ? BarCodeScanner.Constants.Type.front
                                    : BarCodeScanner.Constants.Type.back
                            );
                        }}>
                        <Text style={{fontSize: 18, margin: 5, color: 'white'}}> Flip </Text>
                    </TouchableOpacity>
                </View>
                <BarcodeMask edgeColor="#62B1F6" showAnimatedLine width={400} height={200}/>
                {scanned && <Button title="Scan Again" onPress={() => setScanned(false)}/>}
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',          
        },
        title: {
            fontSize: 20,
            fontWeight: 'bold',
        },
        separator: {
            marginVertical: 30,
            height: 1,
            width: '80%',
        },
});
