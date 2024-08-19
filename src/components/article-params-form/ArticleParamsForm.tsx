import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from 'components/text';
import { Select } from 'components/select';
import { RadioGroup } from 'components/radio-group';
import { Separator } from 'components/separator';

import { useState, useEffect, FormEvent, useRef } from 'react';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	ArticleStateType,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';

import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';

type TFormClose = {
	isActive: boolean;
	onClose: () => void;
	ref: React.RefObject<HTMLElement>;
};

export const FormClose = (props: TFormClose) => {
	const { isActive, onClose, ref } = props;

	useEffect(() => {
		if (!isActive) return;
		function handleOutside(event: MouseEvent) {
			const { target } = event;
			const isOutside =
				target instanceof Node && ref.current && !ref.current.contains(target);
			if (isOutside) {
				onClose();
			}
		}

		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleOutside);

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.removeEventListener('mousedown', handleOutside);
		};
	}, [isActive, onClose, ref]);
};

type ArticleParamsFormProps = {
	defaultArticle: ArticleStateType;
	setDefaultArticle: (date: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const { defaultArticle, setDefaultArticle } = props;

	const [isActive, setIsActive] = useState(false);
	const [articleState, setArticleState] = useState(defaultArticle);
	const ref = useRef<HTMLFormElement | null>(null);

	FormClose({
		isActive,
		onClose: () => setIsActive(false),
		ref: ref,
	});

	function optionFontFamily(value: OptionType) {
		setArticleState({ ...articleState, fontFamilyOption: value });
	}

	function optionFontSize(value: OptionType) {
		setArticleState({ ...articleState, fontSizeOption: value });
	}

	function optionFontColor(value: OptionType) {
		setArticleState({ ...articleState, fontColor: value });
	}

	function optionBackgroundColor(value: OptionType) {
		setArticleState({ ...articleState, backgroundColor: value });
	}

	function optionContentWidth(value: OptionType) {
		setArticleState({ ...articleState, contentWidth: value });
	}

	function submitForm(event: FormEvent) {
		event.preventDefault();
		setDefaultArticle(articleState);
	}

	function resetForm() {
		setArticleState(defaultArticleState);
		setDefaultArticle(defaultArticleState);
	}

	function toggleForm() {
		setIsActive((active) => !active);
	}

	return (
		<>
			<ArrowButton isActive={isActive} onClick={toggleForm} />
			<aside
				className={clsx(styles.container, isActive && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={submitForm}
					onReset={resetForm}
					ref={ref}>
					<Text
						as='h1'
						size={31}
						weight={800}
						uppercase={true}
						fontStyle='normal'
						align='left'
						family='open-sans'>
						{' '}
						Задайте параметры{' '}
					</Text>
					<Select
						selected={articleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={optionFontFamily}
					/>
					<RadioGroup
						name='font-size'
						options={fontSizeOptions}
						selected={articleState.fontSizeOption}
						onChange={optionFontSize}
						title='Размер шрифта'
					/>
					<Select
						selected={articleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={optionFontColor}
					/>
					<Separator />
					<Select
						selected={articleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={optionBackgroundColor}
					/>
					<Select
						selected={articleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={optionContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
