import Colors from "./Colors";
import {StyleSheet} from 'react-native';


export const defaultStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFFFF',
    },
    inputField: {
        height: 44,
        borderWidth: 1,
        borderColor: '#E5E5E5',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
    },
    btn: {
        backgroundColor: Colors.primary,
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnIcon: {
        position: 'absolute',
        left: 16,
    },
    btnText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        height: 100,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderTopColor: Colors.grey,
        borderTopWidth: StyleSheet.hairlineWidth

    }
})
