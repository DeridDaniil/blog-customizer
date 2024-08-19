import { useState, CSSProperties } from 'react';
import clsx from 'clsx';

import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';
import { defaultArticleState } from 'src/constants/articleProps';

import styles from './App.module.scss';

export const App = () => {
	const [defaultArticle, setDefaultArticle] = useState(defaultArticleState);
	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': defaultArticle.fontFamilyOption.value,
					'--font-size': defaultArticle.fontSizeOption.value,
					'--font-color': defaultArticle.fontColor.value,
					'--container-width': defaultArticle.contentWidth.value,
					'--bg-color': defaultArticle.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				defaultArticle={defaultArticle}
				setDefaultArticle={setDefaultArticle}
			/>
			<Article />
		</div>
	);
};
