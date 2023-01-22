import { useNavigation } from "@react-navigation/native";
import { Text } from "react-native";

export function HabitEmpty(){
    const { navigate } = useNavigation();

    return(
        <Text className="text-zinc-400 text-bsae">
            Voce ainda não habitos cadastrados nesse Dia. {' '}

            <Text className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate('new')}
            >
                Crie um Habito aqui!
            </Text>
        </Text>
    )
}