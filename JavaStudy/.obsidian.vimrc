" 基本 Vim 配置
set nocompatible

" 启用行号
set number

" 设置系统剪贴板
if has('clipboard')
    set clipboard=unnamedplus " Linux 和 Windows
    " 如果是 macOS，可以使用 unnamed
endif

" 插入模式下使用 jk 退出到普通模式
inoremap jk <Esc>
inoremap kj <Esc>

" 让 Vim 使用系统剪贴板进行复制粘贴
vnoremap <C-c> "+y
map <C-v> "+p

" 其他有用的快捷键
nnoremap Y y$
nnoremap n nzz
nnoremap N Nzz

" 搜索设置
set ignorecase
set smartcase
set incsearch
set hlsearch

" 缩进设置
set autoindent
set smartindent
set tabstop=4
set shiftwidth=4
set expandtab

" 其他优化
set backspace=indent,eol,start
set history=1000
set undolevels=1000
