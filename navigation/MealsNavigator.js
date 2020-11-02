import React from 'react';
import { Platform, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import Colors from '../constants/Colors';
import FavoritesScreen from '../screens/FavoritesScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import MealsDetailScreen from '../screens/MealDetailScreen';
import FiltersScreen from '../screens/FiltersScreen';

const defaultStackNavOptions = {
	headerStyle: {
		backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : 'white'
	},
	headerTitleStyle: {
		fontFamily: 'open-sans-bold'
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans'
	},
	// headerTitleStyle: { alignSelf: 'center' },
	headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor
};

const MealsNavigator = createStackNavigator(
	{
		Categories: CategoriesScreen,
		CategoryMeals: CategoryMealsScreen,
		MealDetail: MealDetailScreen
	},
	{
		//  initialRouteName:'Categories',
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const FavNavigator = createStackNavigator(
	{
		Favorites: FavoritesScreen,
		MealDetail: MealsDetailScreen
	},
	{
		//  initialRouteName:'Categories',
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const tabScreenConfig = {
	Meals: {
		screen: MealsNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.primaryColor,
			tabBarLabel: Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans' }}>Meals</Text> : 'Meals'
		}
	},
	Favorites: {
		screen: FavNavigator,
		navigationOptions: {
			tabBarIcon: (tabInfo) => {
				return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
			},
			tabBarColor: Colors.accentColor,
			tabBarLabel:
				Platform.OS === 'android' ? <Text style={{ fontFamily: 'open-sans' }}>Favorites</Text> : 'Favorites'
		}
	}
};

const MealsFavTabNavigator =
	Platform.OS === 'android'
		? createMaterialBottomTabNavigator(tabScreenConfig, {
				activeTintColor: 'white',
				shifting: true,
				barStyle: { backgroundColor: Colors.primaryColor }
			})
		: createBottomTabNavigator(tabScreenConfig, {
				tabBarOptions: {
					labelStyle: {
						fontFamily: 'open-sans'
					},
					activeTintColor: Colors.accentColor
				}
			});

const FiltersNavigator = createStackNavigator(
	{
		Filters: FiltersScreen
	},
	{
		//  initialRouteName:'Categories',
		defaultNavigationOptions: defaultStackNavOptions
	}
);

const MainNavigator = createDrawerNavigator(
	{
		MealFavs: { screen: MealsFavTabNavigator, navigationOptions: { drawerLabel: 'Meals' } },
		Filters: FiltersNavigator
	},
	{
		contentOptions: {
			activeTintColor: Colors.accentColor,
			labelStyle: {
				fontFamily: 'open-sans-bold'
			}
		}
	}
);

export default createAppContainer(MainNavigator);
