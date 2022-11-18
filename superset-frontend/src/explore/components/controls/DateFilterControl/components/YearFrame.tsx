/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { useSelector } from 'react-redux';
import { t } from '@superset-ui/core';
import { FrameComponentProps } from 'src/explore/components/controls/DateFilterControl/types';
import { YearPicker } from 'src/components/DatePicker';
// @ts-ignore
import { locales } from 'antd/dist/antd-with-locales';
import {
  SEPARATOR,
  dttmToMoment,
  LOCALE_MAPPING,
  MOMENT_FORMAT,
} from 'src/explore/components/controls/DateFilterControl/utils';
import { ExplorePageState } from 'src/explore/types';
import moment, { Moment } from 'moment';

export function YearFrame(props: FrameComponentProps) {
  let [sinceSrc] = (props.value || SEPARATOR).split(SEPARATOR);
  if (sinceSrc == null || sinceSrc.length === 0 || sinceSrc === 'No filter') {
    sinceSrc = moment().format(MOMENT_FORMAT);
  }
  const since = sinceSrc;

  function onChange(since: string, until: string) {
    props.onChange(`${since}${SEPARATOR}${until}`);
  }
  const localFromFlaskBabel =
    useSelector((state: ExplorePageState) => state.common.locale) || 'en';
  const currentLocale = locales[LOCALE_MAPPING[localFromFlaskBabel]].DatePicker;

  return (
    <>
      <div data-test="custom-frame">
        <div className="section-title">{t('Configure Year')}</div>
      </div>
      <YearPicker
        showTime
        allowClear={false}
        locale={currentLocale}
        value={dttmToMoment(since)}
        onChange={(datetime: Moment) =>
          onChange(
            datetime.startOf('year').format(MOMENT_FORMAT),
            datetime.add(1, 'year').startOf('year').format(MOMENT_FORMAT),
          )
        }
      />
    </>
  );
}
