function About(props) {
    const styles = {
        propertiesCover: {
            overflowY: 'auto',
            height: '300px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
        },
        propertyCover: {
            width:'28%',
            height: '100px',
            border: '1px solid #ff9817',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center'
        },
        propertyKey: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'capitalize',
            color: 'rgb(81, 66, 252)',
        },
        propertyValue: {
            fontFamily: 'Urbanist',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: '18px',
            lineHeight: '22px',
            textTransform: 'capitalize',
            color: 'white',
        },
    }
    return (
        <div style={styles.propertiesCover}>
            <div style={styles.propertyCover}>
                <p style={styles.propertyKey}>Mint</p>
                <p style={styles.propertyValue}>{props.mint}</p>
            </div>

            <div style={styles.propertyCover}>
                <p style={styles.propertyKey}>Rarity</p>
                <p style={styles.propertyValue}>{props.rarity}</p>
            </div>
        </div>
    )
}

export default About