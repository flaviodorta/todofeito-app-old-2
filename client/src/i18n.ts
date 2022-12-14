import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    debug: true,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    resources: {
      en: {
        translation: {
          TodoItem: {
            today: 'Today',
          },

          SidebarProject: {
            editProject: 'Edit project',
            deleteProject: 'Delete project',
          },

          Sidebar: {
            inbox: 'Inbox',
            today: 'Today',
            upcoming: 'Upcoming',
            labels: 'Labels',
            projects: 'Projects',
          },

          SearchBar: {
            results: 'Results',
            noResults: 'No results',
            recentSearches: 'Recents searches',
            clear: 'Clear',
            recentlyViewed: 'Recently viewed',
            search: 'Search',
          },

          Navbar: {
            closeMenu: 'Close menu',
            openMenu: 'Open menu',
            goToHome: 'Go to home',
            addTodo: 'Add todo',
            openProfileMenu: 'Open profile menu',
            settings: 'Settings',
            logout: 'Logout',
          },

          EditTodo: {
            todoName: 'Todo name',
            description: 'Description',
            dueDate: 'Due date',
            cancel: 'Cancel',
            save: 'Save',
          },

          EditSection: {
            addSection: 'Add section',
            cancel: 'Cancel',
          },

          EditProjectModal: {
            editProject: 'Edit project',
            title: 'Title',
            characterLimit: 'Character limit',
            color: 'Color',
            cancel: 'Cancel',
            add: 'Add',
          },

          CreateProjectModal: {
            addProject: 'Add project',
            title: 'Title',
            charcterLimit: 'Character limit',
            color: 'Color',
            cancel: 'Cancel',
            add: 'Add',
          },

          CreateLabelModal: {
            addLabel: 'Add label',
            labelTitle: 'Label title',
            characterLimit: 'Character limit',
            labelColor: 'Label color',
            cancel: 'Cancel',
            add: 'Add',
          },

          AddTodoModal: {
            todoName: 'Todo name',
            dueDate: 'Due date',
            description: 'Description',
            inbox: 'Inbox',
            cancel: 'Cancel',
            addTodo: 'Add todo',
          },

          AddTodo: {
            dueDate: 'Due date',
            cancel: 'Cancel',
            addTodo: 'Add todo',
          },

          AddSection: {
            addSection: 'Add section',
            cancel: 'Cancel',
          },

          UserSettingsModal: {
            settings: 'Settings',
            account: 'Account',
            general: 'General',
            uploadPhoto: 'Upload photo',
            pickAPhotoUpTo10MB: 'Pick a photo up to 10MB.',
            removePhoto: 'Remove photo',
            name: 'Name',
            email: 'Email',
            changeEmail: 'Change email',
            password: 'Password',
            changePassword: 'Change password',
            deleteAccount: 'Delete account',
            deleteAccountWarning:
              'This will immediately delete all of your data including tasks, projects, comments, and more. This can’t be undone.',
            cancel: 'Cancel',
            update: 'Update',
            language: 'Language',
            homeView: 'Home view',
            photo: 'Photo',
          },

          UpcomingTodosSection: {
            addTodo: 'Add todo',
          },

          TodosSection: {
            editSection: 'Edit section',
            deleteSection: 'Delete section',
            addTodo: 'Add todo',
            addSection: 'Add section',
          },

          ProjectContent: {
            addTodo: 'Add todo',
            addSection: 'Add section',
          },

          LabelContent: {
            addTodo: 'Add todo',
          },

          InboxContent: {
            inbox: 'Inbox',
            addTodo: 'Add todo',
          },

          TodayContent: {
            addTodo: 'Add todo',
            today: 'Today',
          },

          FiltersAndLabelsContent: {
            filtersAndLabels: 'Filters & Labels',
            labels: 'Labels',
          },

          dates: {
            today: 'Today',
            tomorrow: 'Tomorrow',
          },

          colors: {
            stone: 'Stone',
            red: 'Red',
            orange: 'Orange',
            amber: 'Amber',
            yellow: 'Yellow',
            lime: 'Lime',
            green: 'Green',
            emerald: 'Emerald',
            teal: 'Teal',
            cyan: 'Cyan',
            sky: 'Sky',
            blue: 'Blue',
            indigo: 'Indigo',
            violet: 'Violet',
            purple: 'Purple',
            fuchsia: 'Fuchsia',
            pink: 'Pink',
            rose: 'Rose',
          },
        },
      },
      pt: {
        translation: {
          TodoItem: {
            today: 'Hoje',
          },

          SidebarProject: {
            editProject: 'Editar projeto',
            deleteProject: 'Deletar projeto',
          },

          Sidebar: {
            inbox: 'Entrada',
            today: 'Hoje',
            upcoming: 'Em breve',
            labels: 'Etiquetas',
            projects: 'Projetos',
          },

          SearchBar: {
            results: 'Resultados',
            noResults: 'Nenhum resultado',
            recentSearches: 'Pesquisas recentes',
            clear: 'Limpar',
            recentlyViewed: 'Vistos recentementes',
            search: 'Buscar',
          },

          Navbar: {
            closeMenu: 'Fechar menu',
            openMenu: 'Abrir menu',
            goToHome: 'Ir para página inicial',
            addTodo: 'Adicionar tarefa',
            openProfileMenu: 'Abrir menu',
            settings: 'Configurações',
            logout: 'Sair',
          },

          EditTodo: {
            todoName: 'Nome da tarefa',
            dueDate: 'Data de vencimento',
            cancel: 'Cancelar',
            save: 'Salvar',
          },

          EditSection: {
            addSection: 'Adicionar seção',
            cancel: 'Cancelar',
          },

          EditProjectModal: {
            editProject: 'Editar projeto',
            title: 'Título',
            characterLimit: 'Limite de caracteres',
            color: 'Cor',
            cancel: 'Cancelar',
            add: 'Adicionar',
          },

          CreateProjectModal: {
            addProject: 'Adicionar projeto',
            title: 'Título',
            charcterLimit: 'Limite de caracteres',
            color: 'Cor',
            cancel: 'Cancelar',
            add: 'Adicionar',
          },

          CreateLabelModal: {
            addLabel: 'Adicionar etiqueta',
            labelTitle: 'Nome da etiqueta',
            characterLimit: 'Limite de caracteres',
            labelColor: 'Cor da etiqueta',
            cancel: 'Cancelar',
            add: 'Adicionar',
          },

          AddTodoModal: {
            todoName: 'Nome da tarefa',
            description: 'Descrição',
            dueDate: 'Data de vencimento',
            inbox: 'Entrada',
            cancel: 'Cancelar',
            addTodo: 'Adicionar tarefa',
          },

          AddTodo: {
            todoName: 'Nome da tarefa',
            description: 'Descrição',
            dueDate: 'Data de vencimento',
            cancel: 'Cancelar',
            addTodo: 'Adicionar tarefa',
          },

          AddSection: {
            addSection: 'Adicionar seção',
            cancel: 'Cancelar',
          },

          UserSettingsModal: {
            settings: 'Configurações',
            account: 'Conta',
            general: 'Geral',
            uploadPhoto: 'Carregar foto',
            pickAPhotoUpTo10MB: 'Escolha uma foto de até 10MB.',
            removePhoto: 'Remover foto',
            name: 'Nome',
            email: 'Email',
            changeEmail: 'Alterar e-mail',
            password: 'Senha',
            changePassword: 'Alterar senha',
            deleteAccount: 'Deletar conta',
            deleteAccountWarning:
              'Isso excluirá imediatamente todos os seus dados, incluindo tarefas, projetos, comentários e muito mais. Isso não pode ser desfeito.',
            cancel: 'Cancelar',
            update: 'Atualizar',
            language: 'Idioma',
            homeView: 'Página inicial',
            photo: 'Foto',
          },

          UpcomingTodosSection: {
            addTodo: 'Adicionar tarefa',
          },

          TodosSection: {
            editSection: 'Editar seção',
            deleteSection: 'Deletar seção',
            addTodo: 'Adicionar tarefa',
            addSection: 'Adicionar seção',
          },

          ProjectContent: {
            addTodo: 'Adicionar tarefa',
            addSection: 'Adicionar seção',
          },

          LabelContent: {
            addTodo: 'Adicionar tarefa',
          },

          InboxContent: {
            addTodo: 'Adicionar tarefa',
            inbox: 'Entrada',
          },

          TodayContent: {
            addTodo: 'Adicionar tarefa',
            today: 'Hoje',
          },

          FiltersAndLabelsContent: {
            filtersAndLabels: 'Etiquetas',
            labels: 'Eitquetas',
          },

          dates: {
            today: 'Hoje',
            tomorrow: 'Amanhã',
          },

          colors: {
            stone: 'Carvão',
            red: 'Vermelho',
            orange: 'Laranja',
            amber: 'Ambâr',
            yellow: 'Amarelo',
            lime: 'Verde Limão',
            green: 'Verde',
            emerald: 'Esmeralda',
            teal: 'Verde Azulado',
            cyan: 'Ciano',
            sky: 'Azul Céu',
            blue: 'Azul',
            indigo: 'Índigo',
            violet: 'Violeta',
            purple: 'Roxo',
            fuchsia: 'Fúchsia',
            pink: 'Rosa',
            rose: 'Magenta',
          },
        },
      },
    },
  });
