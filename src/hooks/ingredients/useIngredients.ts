import firebase from "firebase/compat";
import { FieldValue } from "firebase/firestore";
import useAuthentication from "hooks/authentication/useAuthentication";
import { useCallback, useEffect, useState } from "react";
import { FirebaseIngredient, Ingredient } from "hooks/ingredients/types";
import { addDataToFirebase, getAndSetIngredients } from "./helpers";
import {
  freezerCollectionRef,
  pantryCollectionRef,
  refrigeratorCollectionRef,
} from "./constants";
import { IngredientLocation } from "screens/ingredients/constants";

const useIngredients = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState<number>(0);
  const [refrigeratorIngredients, setRefrigeratorIngredients] =
    useState<Ingredient[]>();
  const [pantryIngredients, setPantryIngredients] = useState<Ingredient[]>();
  const [freezerIngredients, setFreezerIngredients] = useState<Ingredient[]>();
  const { user } = useAuthentication();

  const getIngredients = useCallback(async () => {
    setIsLoading(true);
    setRefrigeratorIngredients(
      await getAndSetIngredients(
        refrigeratorCollectionRef,
        IngredientLocation.Refrigerator,
      ),
    );
    setPantryIngredients(
      await getAndSetIngredients(
        pantryCollectionRef,
        IngredientLocation.Pantry,
      ),
    );
    setFreezerIngredients(
      await getAndSetIngredients(
        freezerCollectionRef,
        IngredientLocation.Freezer,
      ),
    );
    setIsLoading(false);
  }, []);

  const addIngredient = async (ingredient: Ingredient) => {
    const { id, name, amount, units, location } = ingredient;

    const timestamp: FieldValue =
      firebase.firestore.FieldValue.serverTimestamp();

    setIsLoading(true);

    const data: FirebaseIngredient = {
      id,
      name,
      amount,
      units,
      createdAt: timestamp,
      createdBy: user?.uid,
    };

    try {
      await addDataToFirebase(location, data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getIngredients();
  }, [getIngredients]);

  return {
    addIngredient,
    isLoading,
    error,
    amount,
    setAmount,
    refrigeratorIngredients,
    pantryIngredients,
    freezerIngredients,
  };
};

export default useIngredients;
