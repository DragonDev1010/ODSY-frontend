function AboutUs() {
    const styles = {
        sectionCover: {
            margin: '50px 440px auto 440px'
        },
        headingCover: {
            borderBottom: '1px solid white'
        },
        heading: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '36px',
            lineHeight: '50px',
            textTransform: 'capitalize',
            color: '#FFFFFF',
        },
        authorCover: {
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '20px'
        },
        nameCover: {
            paddingRight: '50px',
        },
        dateCover: {
            marginLeft: '40px'
        },
        fontSmHeading: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '16px',
            lineHeight: '26px',
        },
        fontSmContent: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '13px',
            lineHeight: '20px',
            color: '#EBEBEB'
        },
        fontMdHeading: {
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '24px',
            lineHeight: '30px',
            color: '#FFFFFF'
        },
        fontMdContent: {
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: '18px',
            lineHeight: '28px',
            color: '#EBEBEB'
        }
    }
    return(
        <div style={styles.sectionCover}>
            <div style={styles.headingCover}>
                <p style={styles.heading}>I Believe everyone can be a designer as long they love to create design</p>
            </div>
            <div style={styles.authorCover}>
                <div style={styles.categoryCover}>
                    <p style={styles.fontSmHeading}>DESIGNER INTERVIEW</p>
                    <p style={styles.fontSmContent}>AUGUST CHAPTER</p>
                </div>
                <div style={{display: 'flex'}}>
                    <div style={styles.nameCover}>
                        <p style={styles.fontSmHeading}>WRITER</p>
                        <p style={styles.fontSmContent}>DWINAWAN</p>
                    </div>
                    <div style={styles.dateCover}>
                        <p style={styles.fontSmHeading}>DATE</p>
                        <p style={styles.fontSmContent}>AUGUST 11, 2021</p>
                    </div>
                </div>
            </div>
            <div style={{width:'100%', height:'400px', backgroundColor: 'grey', marginBottom: '10px'}}>
                <img></img>
            </div>
            <div style={styles.contentCover}>
                <p style={styles.fontMdHeading}>What is the most fun thing to become a designer?</p>
                <p style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
                
                <div style={{width:'100%', height:'170px', display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                    <img style={{width: '45%', height: '100%', backgroundColor: 'grey'}}></img>
                    <img style={{width: '45%', height: '100%', backgroundColor: 'grey'}}></img>
                </div>
                
                <p style={styles.fontMdHeading}>How is your daily routine?</p>
                <p style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Cupidatat non
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>

                <div style={{width:'100%', height:'170px', backgroundColor: 'grey', marginBottom: '10px'}}>
                    <img></img>
                </div>

                <p style={styles.fontMdHeading}>Middle Post Heading</p>
                <p style={styles.content}>Middle Post Heading
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. 
                Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.</p>
            </div>
            
            <div style={styles.shareCover}>

            </div>
        </div>
    )
}

export default AboutUs