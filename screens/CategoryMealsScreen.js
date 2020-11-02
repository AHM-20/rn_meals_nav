import React from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { CATEGORIES } from '../data/dummy-data';
import MealList from '../components/MealsList';
import DefaultText from '../components/DefaultText';

const CatgoryMealsScreen = (props) => {
	const catId = props.navigation.getParam('categoryId');

	const availableMeals = useSelector((state) => state.meals.filteredMeals);

	const displayedMeals = availableMeals.filter((meal) => meal.categoryIds.indexOf(catId) >= 0);

	if (displayedMeals.length === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meals found, please check your filters.</DefaultText>
			</View>
		);
	}

	return <MealList listData={displayedMeals} navigation={props.navigation} />;
};

CatgoryMealsScreen.navigationOptions = (navigationData) => {
	const catId = navigationData.navigation.getParam('categoryId');
	const selectedCategory = CATEGORIES.find((category) => category.id === catId);

	return {
		headerTitle: selectedCategory.title
	};
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	}
});

export default CatgoryMealsScreen;
