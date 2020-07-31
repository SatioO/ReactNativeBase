import React, { useState } from 'react';
import { Button, Linking } from 'react-native';
import { Block, Input, Text } from '../../../components';
import { useTheme } from '@react-navigation/native';

const UsernameScreen = (props) => {
  const { sizes, colors } = useTheme();
  const [username, setUsername] = useState(
    !!props.params.username ? props.params.username : '',
  );
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  function onUsernameChange(text) {
    if (!!error) setError(null);
    setUsername(text);
  }

  async function onContinue() {
    if (!!error) setError(null);

    Keyboard.dismiss();

    const validation = validator(username);
    if (!validation.error) {
      setLoading(true);
      try {
        const industries = await onUsernameAuth({
          username,
          usernameType: validation.usernameType,
        });

        if (industries.status === 200 && industries.data.length > 0) {
          const accessibleIndustries = industries.data
            .filter((industry) => industry.status)
            .reduce(
              (acc, industry) => ({
                ...acc,
                [industry.industryId]: {
                  token: industry.data.access_token
                    ? industry.data.access_token
                    : null,
                  username,
                  status: industry.data.access_token ? true : false,
                  type: validation.usernameType,
                  // NOTE: send user to the set password screen if we 2 or OTP used,
                  // We can consider it as a verfied state only. thts called the magic of APIs ;)
                  verified: industry.data,
                  industry: industry.industry,
                },
              }),
              {},
            );

          // NOTE: Checks if the user does not belong to any industry
          if (Object.keys(accessibleIndustries).length === 0) {
            setLoading(false);
            setError(NO_ACCOUNT(validation.usernameType));
            return;
          }

          // NOTE: Update reducer value with latest industry information
          await props.setIndustryInfo(accessibleIndustries);
          const metadata = Object.keys(accessibleIndustries).reduce(
            (acc, current) => ({ ...acc, [current]: {} }),
            {},
          );
          await AsyncStorage.setItem('metadata', JSON.stringify(metadata));

          if (Object.keys(accessibleIndustries).length > 1) {
            if (!!error) setError(null);
            setLoading(false);
            setUsername('');
            props.onNavigate(INDUSTRY_SELECTION_SCREEN, {
              username,
            });
          } else {
            // NOTE: As user is in only one industry, next condition is to check
            // whether the user is verified, if not, get the user verified otherwise
            // redirect to password screen
            const selectedIndustry =
              accessibleIndustries[Object.keys(accessibleIndustries)[0]];

            // NOTE: Set the default industry configuration
            toggleIndustry(selectedIndustry.industry.urlMaps);
            toggleIndustryConfig(
              industryConfigList[selectedIndustry.industry.id],
            );
            // NOTE: Redirect user to straight to the enter password screen in case of verified
            if (!!error) setError(null);
            setLoading(false);
            setUsername('');
            // '0' -> Email Verification screen, '1' -> SEND OTP, '2' -> ENTER_PASSWORD
            // OTPUSED: ENTER_PASSWORD_SCREEN,
            // SET_PASSWORD: OTP_SCREEN -> CREATE_PASSWORD,
            // SUCCESS -> OTP_SCREEN
            if (isVerified(selectedIndustry.verified)) {
              props.onNavigate(ENTER_PASSWORD_SCREEN, {
                username,
                activeIndustry: selectedIndustry.industry.id,
              });
            } else {
              if (selectedIndustry.verified === OTP_VERIFIED) {
                // NOTE: this API is only used for checking the status, not for sending OTP
                // True flag avoids sending OTP
                const response = await onSendVerificationOTP(username);
                if (response.data.statusCode === 200) {
                  if (response.data.data === OTP_USED) {
                    props.onNavigate(ENTER_PASSWORD_SCREEN, {
                      username,
                      activeIndustry: selectedIndustry.industry.id,
                    });
                  } else if (
                    response.data.data === SET_PASSWORD ||
                    response.data.data === 'Success' // API rocks ;)
                  ) {
                    props.onNavigate(OTP_VERIFICATION_SCREEN, {
                      username,
                      activeIndustry: selectedIndustry.industry.id,
                      sendOTP: false,
                    });
                  } else {
                    throw new Error('Oh No !!');
                  }
                } else {
                  throw new Error('Verification Status Check Failed..!!');
                }
              } else {
                if (validation.usernameType === EMAIL_TYPE) {
                  props.onNavigate(EMAIL_VERIFICATION_SCREEN, {
                    username,
                    activeIndustry: selectedIndustry.industry.id,
                  });
                } else {
                  props.onNavigate(OTP_VERIFICATION_SCREEN, {
                    username,
                    activeIndustry: selectedIndustry.industry.id,
                  });
                }
              }
            }
          }
        } else {
          throw new Error('Oh No !!');
        }
      } catch (error) {
        setLoading(false);
        setError('OOPS, Something went wrong!. Please try again.');
      }
    } else {
      setError(validation.error.message);
    }
  }

  return (
    <Block padding={[0, sizes.padding]}>
      <Input
        email
        keyboardType="email-address"
        label="Email or Mobile Number"
        error={!!error}
        defaultValue={username}
        onChangeText={onUsernameChange}
      />
      {!!error && (
        <Text caption tertiary>
          {error}
        </Text>
      )}
      <Block center>
        <Button
          color={colors.primary}
          style={{
            width: sizes.base * 8,
            backgroundColor:
              username.length === 0 || error || !!loading
                ? colors.gray
                : colors.primary,
          }}
          onPress={onContinue}
          disabled={username.length === 0 || !!error || !!loading}
          title="Continue"></Button>
      </Block>
      <Block flex={false} center style={{ marginBottom: sizes.base * 4 }}>
        <Text gray caption>
          By logging in you agree to the{' '}
          <Text
            primary
            caption
            bold
            style={{ textDecorationLine: 'underline' }}
            onPress={() => Linking.openURL(config.TERMS_AND_SERVICE)}>
            Terms & Services
          </Text>
        </Text>
      </Block>
    </Block>
  );
};

export default UsernameScreen;
