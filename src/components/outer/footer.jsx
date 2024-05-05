import React from 'react';

function Footer() {
    return (
        <footer>
            <div className='media'><img src='https://cdn4.iconfinder.com/data/icons/social-circle/512/vk-512.png'
                                        alt='N/A'/><a rel="noreferrer" target='_blank'
                                                      href='https://vk.com/fakyring'> </a></div>
            <div className='media'><img
                src='https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/1024px-Circle-icons-mail.svg.png'
                alt='N/A'/><a rel="noreferrer" target='_blank' href='mailto:darkveyron@mail.ru'> </a></div>
            <div className='media'><img src='https://upload.wikimedia.org/wikipedia/ru/2/2d/MIREA_Logo.svg'
                                        alt='N/A'/><a rel="noreferrer" target='_blank' href='https://mirea.ru'> </a>
            </div>
            <div style={{position: "absolute", right: 0, bottom: 0}}>Семянников Н.С. ИКБО-02-21</div>
        </footer>
    )
}

export default Footer;