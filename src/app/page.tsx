import '../styles/globals.css';


export default function HomePage() {
  return (
  <div className="text-container">
      <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 700, wordWrap: 'break-word' }}>
      hi<br/>
    </span>
    <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
      My name is
    </span>
    <span className='poppins' style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
      {' '}Sai<br/>
    </span>
    <span className='vastshadow'  style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
      a computer science student
    </span>
        <span  className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
         {' '}
        </span>
        <span className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
        at
       </span>
       <span className='poppins'  style={{ color: 'white', fontSize: '40px', fontWeight: 300, wordWrap: 'break-word' }}>
         {' '}
     </span>
       <span className='cutivemono' style={{ color: 'white', fontSize: '40px', fontWeight: 400, wordWrap: 'break-word' }}>
         {'<Michigan State University/>'}
     </span>
  </div>
  );
}
