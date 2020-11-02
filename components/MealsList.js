import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealItem from '../components/MealItem';
import { useSelector } from 'react-redux';

const MealsList = (props) => {
	const favoriteMeals = useSelector((state) => state.meals.favoriteMeals);

	const renderMealItem = (itemData) => {
		const isFavorite = favoriteMeals.some((meal) => meal.id === itemData.item.id);
		return (
			<MealItem
				title={itemData.item.title}
				affordability={itemData.item.affordability}
				complexity={itemData.item.complexity}
				duration={itemData.item.duration}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
					props.navigation.navigate({
						routeName: 'MealDetail',
						params: {
							mealId: itemData.item.id,
							mealTitle: itemData.item.title,
							isFav: isFavorite
						}
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				data={props.listData}
				renderItem={renderMealItem}
				keyExtractor={(item) => item.id}
				style={{ width: '100%' }}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 15
	}
});

export default MealsList;
