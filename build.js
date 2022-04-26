const StyleDictionaryPackage = require('style-dictionary');
const fs = require('fs');
const _ = require('lodash');

// HAVE THE STYLE DICTIONARY CONFIG DYNAMICALLY GENERATED

function getStyleDictionaryConfig() {
    return {
        "source": [
            "token_out.json"
        ],
        "platforms": {
            "android": {
                // I have used custom formats for Android but keep in mind that Style Dictionary offers some default formats/templates for Android,
                // so have a look at the documentation before creating custom templates/formats, maybe they already work for you :)
                "transformGroup": "tokens-android",
                "buildPath": `android/`,
                "files": [
                    {
                        "destination": "colors.xml",
                        "format": "android/xml",
                        "filter":{
                            "type": "color"
                        }
                    },
                    {
                        "destination": "dimens.xml",
                        "format": "android/xml",
                        "filter":{
                            "type": "sizing"
                        }
                    },
                     {
                        "destination": "dimens.xml",
                        "format": "android/xml",
                        "filter":{
                            "type": "fontSizes"
                        }
                    },
                     {
                         "destination": "dimens_border_radius.xml",
                         "format": "android/xml",
                         "filter":{
                             "type": "borderRadius",
                         }
                     },
                     {
                         "destination": "dimens_spacing.xml",
                         "format": "android/xml",
                         "filter":{
                             "type": "spacing",
                         }
                     },
                     {
                         "destination": "dimens_border_width.xml",
                         "format": "android/xml",
                         "filter":{
                             "type": "borderWidth",
                         }
                     },
                     {
                         "destination": "dimens_paragraph_spacing.xml",
                         "format": "android/xml",
                         "filter":{
                             "type": "paragraphSpacing",
                         }
                     }
                     ,
                     {
                         "destination": "tokens_all.xml",
                         "format": "android/xml"
                     }
                ]
            }
        }
    };
}

// REGISTER CUSTOM FORMATS + TEMPLATES + TRANSFORMS + TRANSFORM GROUPS

// if you want to see the available pre-defined formats, transforms and transform groups uncomment this
// console.log(StyleDictionaryPackage);

StyleDictionaryPackage.registerFormat({
    name: 'android/xml',
    formatter: _.template(fs.readFileSync(__dirname + '/templates/android-xml.template'))
  });

// I wanted to use this custom transform instead of the "prefix" property applied to the platforms
// because I wanted to apply the "token" prefix only to actual tokens and not to the aliases
// but I've found out that in case of "name/cti/constant" the prefix was not respecting the case for the "prefix" part
//
// StyleDictionaryPackage.registerTransform({
//     name: 'name/prefix-token',
//     type: 'name',
//     matcher: function(prop) {
//         return prop.attributes.category !== 'alias';
//     },
//     transformer: function(prop) {
//         return `token-${prop.name}`;
//     }
// });

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToPt',
    type: 'value',
    matcher: function(prop) {
        return prop.value.match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.replace(/px$/, 'pt');
    }
});

StyleDictionaryPackage.registerTransform({
    name: 'size/pxToDp',
    type: 'value',
    matcher: function(prop) {
        return prop.value.match(/^[\d.]+px$/);
    },
    transformer: function(prop) {
        return prop.value.replace(/px$/, 'dp');
    }
});

StyleDictionaryPackage.registerTransformGroup({
    name: 'tokens-android',
    // to see the pre-defined "android" transformation use: console.log(StyleDictionaryPackage.transformGroup['android']);
    transforms: [   
        'attribute/cti',
        'name/cti/snake',
        'color/hex8android',
        'size/remToSp',
        'size/remToDp']
});

console.log('Build started...');

StyleDictionaryPackage.extend(getStyleDictionaryConfig()).buildPlatform('android');

console.log('\n==============================================');
console.log('\nBuild completed!');
