export interface CardModel{
    id: number;
    word_english: string;
    word_spanish: string;
    meaning_english: string;
    meaning_spanish: string;
    example_english: string;
    example_spanish: string;
    course_id: number;
}


export interface CardSimilarModel{
    id: number;
    word_english: string;
    word_spanish: string;
    meaning_english: string;
    meaning_spanish: string;
    example_english: string;
    example_spanish: string;
    card_id: number;
}


export interface CardSimilarModelInput{
    id_similar: number;
    word_english_similar: string;
    word_spanish_similar: string;
    meaning_english_similar: string;
    meaning_spanish_similar: string;
    example_english_similar: string;
    example_spanish_similar: string;
    card_id_similar: number;
}