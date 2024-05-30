import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useMemo, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Listings from '@/components/Listings';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import {Listing} from '@/interfaces/Listing';

interface Props {
  listings: Listing[];
  category: string;
}

// Bottom sheet that wraps our Listings component
const ListingsBottomSheet = ({ listings, category }: Props) => {
const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '100%'], []);
  const [refresh, setRefresh] = useState<number>(0);

  const onShowMap = () => {
    bottomSheetRef.current?.collapse();
    setRefresh(refresh + 1);
  };

  return (
    // <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
        <View style={{flex: 1, backgroundColor: '#fff'}}>
            <Listings listings={listings} category={category} />
        </View>
    // </BottomSheet>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },
  absoluteView: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: Colors.dark,
    padding: 14,
    height: 50,
    borderRadius: 30,
    flexDirection: 'row',
    marginHorizontal: 'auto',
    alignItems: 'center',
  },
  sheetContainer: {
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});

export default ListingsBottomSheet;
