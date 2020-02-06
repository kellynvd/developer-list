import React from 'react';
import { shallow } from '../../enzyme';
import Member from '../../components/Member';

let currentMemberId = null;
let member = null;
let currentMemberData = null;
let wrapper = null;

describe('Member component', () => {
  describe('when props.currentMemberId is not present', () => {
    beforeEach(() => {
      currentMemberId = null;
      member = { id: 1, login: 'kellynvd', name: 'Kellyn', avatar_url: 'avatar-url' };
      currentMemberData = {}
      wrapper = shallow(<Member member={member} currentMemberId={currentMemberId} currentMemberData={currentMemberData} />)
    });

    it('renders member avatar', () => {
      expect(wrapper.find('img').exists()).toBeTruthy();
    });

    it('renders member login', () => {
      expect(wrapper.text()).toBe(member.login);
    });
  });

  describe('when props.currentMemberId is diferent tfrom props.member.id', () => {
    beforeEach(() => {
      currentMemberId = 2;
      member = { id: 1, login: 'kellynvd', name: 'Kellyn', avatar_url: 'avatar-url' };
      currentMemberData = {}
      wrapper = shallow(<Member member={member} currentMemberId={currentMemberId} currentMemberData={currentMemberData} />)
    });

    it('renders member avatar', () => {
      expect(wrapper.find('img').exists()).toBeTruthy();
    });

    it('renders member login', () => {
      expect(wrapper.text()).toBe(member.login);
    });
  });

  describe('when props.currentMemberId is equal to props.member.id', () => {
    beforeEach(() => {
      currentMemberId = 1;
      member = { id: 1, login: 'kellynvd', name: 'Kellyn', avatar_url: 'avatar-url' };
      currentMemberData = {name: 'Kellyn', created_at: '2015-07-13T11:35:14Z', public_repos: '16', followers: '42' }
      wrapper = shallow(<Member member={member} currentMemberId={currentMemberId} currentMemberData={currentMemberData} />)
    });

    it('renders member avatar', () => {
      expect(wrapper.find('img').exists()).toBeTruthy();
    });

    it('renders member name', () => {
      expect(wrapper.find('.member-name').text()).toBe(currentMemberData.name);
    });

    it('renders member created_at', () => {
      expect(wrapper.find('t').dive().find('time').text()).toBe('13/07/2015');
    });

    it('renders member public_repos', () => {
      expect(wrapper.find('.member-info-title').first().text()).toBe(currentMemberData.public_repos);
    });

    it('renders member followers', () => {
      expect(wrapper.find('.member-info-title').last().text()).toBe(currentMemberData.followers);
    });
  });
});
