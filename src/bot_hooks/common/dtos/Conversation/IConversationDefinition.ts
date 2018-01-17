
interface IConversationDefinition {
    use_localization: boolean,
    locale: string,
    localization_strings_file_path: string,
    actions: {
        [propName: string]: IAction
    }
}
