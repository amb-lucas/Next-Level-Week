import React, { useEffect, useState } from "react";
import { Feather as Icon } from "@expo/vector-icons";
import { View, ImageBackground, Image, StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";

interface IBGEUFResponse {
  id: number;
  sigla: string;
  nome: string;
}

interface UF {
  id: number;
  initials: string;
  name: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {
  const [selectedUf, setSelectedUf] = useState("0");
  const [selectedCity, setSelectedCity] = useState("");
  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<string[]>([]);

  const navigation = useNavigation();
  const handleNavigateToPoints = () => {
    navigation.navigate("Points", {
      uf: selectedUf,
      city: selectedCity,
    });
  };

  // Load UFs
  useEffect(() => {
    axios
      .get<IBGEUFResponse[]>(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
      )
      .then((response) => {
        const ufData = response.data.map((uf) => ({
          id: uf.id,
          initials: uf.sigla,
          name: uf.nome,
        }));

        setUfs(ufData);
      });
  }, []);

  // Select UF
  const handleSelectUf = (value: string) => {
    setSelectedUf(value);
    if (value === "") {
      setSelectedUf("");
      setCities([]);
      setSelectedCity("");
    }
  };

  // Load Cities
  useEffect(() => {
    if (selectedUf !== "") {
      axios
        .get<IBGECityResponse[]>(
          `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
        )
        .then((response) => {
          const citiesName = response.data.map((city) => city.nome);
          setCities(citiesName);
        });
    } else setCities([]);
  }, [selectedUf]);

  return (
    <ImageBackground
      source={require("../../assets/home-background.png")}
      style={styles.container}
      imageStyle={{ width: 274, height: 368 }}
    >
      <View style={styles.main}>
        <Image source={require("../../assets/logo.png")} />
        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
        <Text style={styles.description}>
          Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.
        </Text>
      </View>

      <View style={styles.footer}>
        {ufs.length > 0 && (
          <RNPickerSelect
            placeholder={{
              label: "Selecionar estado",
              value: "",
            }}
            style={pickerSelectStyles}
            onValueChange={(value) => handleSelectUf(value)}
            items={ufs.map((uf) => ({
              key: uf.id,
              label: uf.name,
              value: uf.initials,
            }))}
          />
        )}

        <RNPickerSelect
          placeholder={{
            label: "Selecionar cidade",
            value: "",
          }}
          style={pickerSelectStyles}
          onValueChange={(value) => setSelectedCity(value)}
          items={cities.map((city) => ({
            label: city,
            value: city,
          }))}
        />

        <RectButton
          style={styles.button}
          onPress={() => {
            if (selectedCity !== "" && selectedUf !== "")
              handleNavigateToPoints();
          }}
        >
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>

          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  main: {
    flex: 1,
    justifyContent: "center",
  },

  title: {
    color: "#322153",
    fontSize: 32,
    fontFamily: "Ubuntu_700Bold",
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: "#6C6C80",
    fontSize: 16,
    marginTop: 16,
    fontFamily: "Roboto_400Regular",
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#34CB79",
    height: 60,
    flexDirection: "row",
    borderRadius: 10,
    overflow: "hidden",
    alignItems: "center",
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    flex: 1,
    justifyContent: "center",
    textAlign: "center",
    color: "#FFF",
    fontFamily: "Roboto_500Medium",
    fontSize: 16,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginBottom: 8,
    height: 54,
    backgroundColor: "#FFF",

    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    marginBottom: 8,
    height: 54,

    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 10,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default Home;
