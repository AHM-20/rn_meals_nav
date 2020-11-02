import React, { useCallback, useEffect } from 'react';
import { ScrollView, Image, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../store/actions/meals';

const ListItem = (props) => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealsDetailScreen = (props) => {
	const availableMeals = useSelector((state) => state.meals.meals);
	const mealId = props.navigation.getParam('mealId');
	const currentMealIsFavorite = useSelector((state) => state.meals.favoriteMeals.some((meal) => meal.id === mealId));
	const selectedMeal = availableMeals.find((meal) => meal.id === mealId);

	const dispatch = useDispatch();

	const toggleFavoriteHandler = useCallback(
		() => {
			dispatch(toggleFavorite(mealId));
		},
		[ dispatch, mealId ]
	);

	useEffect(
		() => {
			//props.navigation.setParams({ mealTitle: selectedMeal.title });
			props.navigation.setParams({ toggleFav: toggleFavoriteHandler });
		},
		[ toggleFavoriteHandler ]
	);

	useEffect(
		() => {
			props.navigation.setParams({ isFav: currentMealIsFavorite });
		},
		[ currentMealIsFavorite ]
	);

	return (
		<ScrollView>
			<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
			<View style={styles.detail}>
				<DefaultText>{selectedMeal.duration}m</DefaultText>
				<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
				<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
			</View>
			<Text style={styles.title}>Ingrediants</Text>
			{selectedMeal.ingredients.map((Ingrediant) => <ListItem key={Ingrediant}>{Ingrediant}</ListItem>)}
			<Text style={styles.title}>Steps</Text>
			{selectedMeal.steps.map((step) => <ListItem key={step}>{step}</ListItem>)}
		</ScrollView>
	);
};

MealsDetailScreen.navigationOptions = (navigationData) => {
	//const mealId = navigationData.navigation.getParam('mealId');
	const mealTitle = navigationData.navigation.getParam('mealTitle');
	const toggleFavorite = navigationData.navigation.getParam('toggleFav');
	const isFavorite = navigationData.navigation.getParam('isFav');
	//const selectedMeal = MEALS.find((meal) => meal.id === mealId);

	return {
		headerTitle: mealTitle,
		headerRight: () => (
			<HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
				<Item
					title="Favorite"
					iconName={isFavorite ? 'ios-star' : 'ios-star-outline'}
					onPress={toggleFavorite}
				/>
			</HeaderButtons>
		)
	};
};

const styles = StyleSheet.create({
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center'
	},
	image: {
		width: '100%',
		height: 200
	},
	detail: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around'
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10
	}
});

export default MealsDetailScreen;
